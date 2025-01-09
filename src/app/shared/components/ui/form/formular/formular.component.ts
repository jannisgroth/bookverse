import { Component, signal } from '@angular/core';
import { TitelInputComponent } from '../titel-input/titel-input.component';
import { UploadInputComponent } from '../upload-input/upload-input.component';
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
import { SuccessAlertComponent } from '../../alerts/success-alert/success-alert.component';

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
    ErrorAlertComponent,
    SuccessAlertComponent,
  ],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css',
})
export class FormularComponent {
  protected buchForm = new FormGroup({});
  protected schlagwoerter = ['JAVASCRIPT', 'JAVA', 'PYTHON', 'TYPESCRIPT'];
  private ausgewähltesFile = signal<File | undefined>(undefined);
  loading = signal(false);
  error = signal({ aktiv: false, message: '' });
  success = signal(false);

  constructor(
    private writeService: WriteService,
    private logger: LoggerService
  ) {}

  /**
   * Validiert das Formular und führt den Bucherstellungsprozess durch.
   * Setzt den Ladezustand, zeigt Erfolgs- oder Fehlermeldungen und
   * setzt das Formular nach Abschluss zurück.
   */
  async onSubmit() {
    // Zuerst prüfen, ob das Formular gültig ist
    if (!this.buchForm.valid) {
      this.logger.error('Formular ist nicht valid');
      //this.loading.set(false); // Ladezustand auf false setzen, falls Formular ungültig ist
      return; // Beende die Methode frühzeitig
    }

    // Ladezustand auf true setzen, wenn der Prozess beginnt
    this.loading.set(true);

    const buchDTO = await this.inputToBuchDTO();

    // Falls keine Datei ausgewählt wurde, rufe den WriteService ohne Datei auf
    const uploadParams =
      this.ausgewähltesFile() === undefined || null
        ? { mitFile: false, file: undefined }
        : { mitFile: true, file: this.ausgewähltesFile() };

    // Erstelle das Buch mit den Parametern
    await this.writeService
      .createBuch(buchDTO, uploadParams)
      .then(() => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => {
          this.success.set(false);
        }, 4000);
      })
      .catch(error => {
        this.loading.set(false);
        this.error.set({ aktiv: true, message: error });
        setTimeout(() => {
          this.error.set({ aktiv: false, message: '' });
        }, 5000);
      })
      .finally(() => {
        this.buchForm.reset({
          buchart: 'wählen',
          rating: 5,
        });
        this.ausgewähltesFile.set(undefined);
        this.loading.set(false);
      });
  }
  /**
   * Erstellt ein Objekt vom Typ BuchDTO mit den Daten des Formulars
   * und gibt es zurück.
   * @returns Ein Objekt vom Typ BuchDTO
   */
  async inputToBuchDTO(): Promise<Omit<Buch, '_links' | 'file'>> {
    const gewählteSchlagwoerter = this.schlagwoerter.filter(
      schlagwort => this.buchForm.get(schlagwort)?.value === true
    );
    return {
      isbn: this.buchForm.get('isbn')!.value,
      rating: Number(this.buchForm.get('rating')!.value),
      art:
        this.buchForm.get('buchart')!.value === 'wählen'
          ? undefined
          : this.buchForm.get('buchart')!.value,
      preis: String(this.buchForm.get('preis')!.value),
      rabatt: this.buchForm.get('rabatt')!.value
        ? (Number(this.buchForm.get('rabatt')!.value) / 100).toFixed(3)
        : undefined,
      lieferbar: this.buchForm.get('lieferbar')!.value ?? undefined,
      datum: this.buchForm.get('datum')!.value ?? undefined,
      homepage: this.buchForm.get('homepage')!.value ?? undefined,
      schlagwoerter:
        gewählteSchlagwoerter === undefined ? undefined : gewählteSchlagwoerter,
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
