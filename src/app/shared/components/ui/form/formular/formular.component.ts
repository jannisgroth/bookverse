import { ChangeDetectorRef, Component, signal, effect } from '@angular/core';
import { TitelInputComponent } from '../titel-input/titel-input.component';
import { UploadInputComponent } from '../upload/upload-input/upload-input.component';
import { RatingRadioComponent } from '../rating-radio/rating-radio.component';
import { SchlagwoerterCheckboxComponent } from '../sclagwoerter-checkbox/schlagwoerter-checkbox.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuchartDropDownComponent } from '../buchart-drop-down/buchart-drop-down.component';
import { IsbnInputComponent } from '../isbn-input/isbn-input.component';
import { UntertitelInputComponent } from '../untertitel-input/untertitel-input.component';
import { HomepageInputComponent } from '../homepage-input/homepage-input.component';
import { DatumInputComponent } from '../datum-input/datum-input.component';
import { PreisInputComponent } from '../preis-input/preis-input.component';
import { RabattInputComponent } from '../rabatt-input/rabatt-input.component';
import { LieferbarCheckboxComponent } from '../lieferbar-checkbox/lieferbar-checkbox.component';
import { WriteService } from '../../../../../core/api/http-write.service';
import { LoggerService } from '../../../../../core/logging/logger.service';
import { ErrorAlertComponent } from '../../alerts/error-alert/error-alert.component';
import { Buch } from '../../../../models/buch.model';

@Component({
  selector: 'app-formular',
  imports: [
    TitelInputComponent,
    IsbnInputComponent,
    SchlagwoerterCheckboxComponent,
    BuchartDropDownComponent,
    ReactiveFormsModule,
    UntertitelInputComponent,
    HomepageInputComponent,
    DatumInputComponent,
    PreisInputComponent,
    RabattInputComponent,
    RatingRadioComponent,
    UploadInputComponent,
    LieferbarCheckboxComponent,
    ErrorAlertComponent
  ],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css',
})
export class FormularComponent {
  protected buchForm = new FormGroup({});
  protected schlagwoerter = ['JAVASCRIPT', 'JAVA', 'PYTHON', 'TYPESCRIPT'];
  private ausgewähltesFile = signal<File | undefined>(undefined);
  loading = signal(false);
  error = signal({ aktive: false, message: '' });

  private effect = effect(() => {
    this.logger.debug('Loading state geändert:', this.loading());
    this.cdr.markForCheck(); // Change Detection auslösen
  });

  constructor(
    private writeService: WriteService,
    private logger: LoggerService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Submit-Methode, die aufgerufen wird, wenn das Formular
   * validiert wurde. Hier wird das BuchDTO erstellt und an den
   * Write-Service gesendet. Wenn eine Datei hochgeladen wurde,
   * wird diese mit dem BuchDTO gesendet.
   */
  async onSubmit() {
    // Zuerst prüfen, ob das Formular gültig ist
    if (!this.buchForm.valid) {
      this.logger.debug('Formular ist nicht valid');
      //this.loading.set(false); // Ladezustand auf false setzen, falls Formular ungültig ist
      return; // Beende die Methode frühzeitig
    }

    // Ladezustand auf true setzen, wenn der Prozess beginnt
    this.loading.set(true);

    const buchDTO = await this.#inputToBuchDTO();

    // Falls keine Datei ausgewählt wurde, rufe den WriteService ohne Datei auf
    const uploadParams = this.ausgewähltesFile() === undefined || null
      ? { mitFile: false, file: undefined }
      : { mitFile: true, file: this.ausgewähltesFile() };

    // Erstelle das Buch mit den Parametern
    await this.writeService.createBuch(buchDTO, uploadParams)
      .catch((error) => {
        this.loading.set(false);
        this.error.set({ aktive: true, message: error });
        setTimeout(() => {
          this.error.set({ aktive: false, message: '' });
        }, 5000);
      })
      .finally(() => {
        this.buchForm.reset({
          buchart: 'wählen',
        });
        this.ausgewähltesFile.set(undefined);
        this.loading.set(false);
      });

  }
  async #inputToBuchDTO(): Promise<Omit<Buch, '_links' | 'file'>> {
    const gewählteSchlagwoerter = this.schlagwoerter.filter(
      schlagwort => this.buchForm.get(schlagwort)?.value === true
    );
    return {
      isbn: this.buchForm.get('isbn')!.value,
      rating: Number(this.buchForm.get('rating')!.value),
      art: this.buchForm.get('buchart')!.value === 'wählen' ? undefined : this.buchForm.get('buchart')!.value,
      preis: String(this.buchForm.get('preis')!.value),
      rabatt: this.buchForm.get('rabatt')!.value
        ? (Number(this.buchForm.get('rabatt')!.value) / 100).toFixed(3)
        : undefined,
      lieferbar: this.buchForm.get('lieferbar')!.value ?? undefined,
      datum: this.buchForm.get('datum')!.value ?? undefined,
      homepage: this.buchForm.get('homepage')!.value ?? undefined,
      schlagwoerter: gewählteSchlagwoerter,
      titel: {
        titel: this.buchForm.get('titel')!.value!,
        untertitel: this.buchForm.get('untertitel')!.value ?? undefined,
      },
    };
  }

  /**
 * Setzt die Datei, die in der File-Upload Komponente ausgewählt wurde.
 * Wenn die Datei undefined ist, wird keine Datei hochgeladen.
 * @param file Die ausgewählte Datei.
 */
  setSelectedFile(file: File | undefined) {
    this.ausgewähltesFile.set(file);
  }

}