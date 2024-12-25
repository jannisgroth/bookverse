import { Component, signal } from '@angular/core';
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
import { Buch } from '../../../../models/buch.model';
import { LieferbarCheckboxComponent } from '../lieferbar-checkbox/lieferbar-checkbox.component';
import { WriteService } from '../../../../../core/api/http-write.service';
import { LoggerService } from '../../../../../core/logging/logger.service';

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
  ],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css',
})
export class FormularComponent {
  protected buchForm = new FormGroup({});
  protected schlagwoerter = ['JAVASCRIPT', 'JAVA', 'PYTHON', 'TYPESCRIPT'];
  private ausgewähltesFile = signal<File | undefined>(undefined);

  constructor(
    private writeService: WriteService,
    private logger: LoggerService
  ) {}

  /**
   * Submit-Methode, die aufgerufen wird, wenn das Formular
   * validiert wurde. Hier wird das BuchDTO erstellt und an den
   * Write-Service gesendet. Wenn eine Datei hochgeladen wurde,
   * wird diese mit dem BuchDTO gesendet.
   */
  async onSubmit() {
    if (this.buchForm.valid) {
      console.log('valide eingaben');
      const gewählteSchlagwoerter = this.schlagwoerter.filter(
        schlagwort => this.buchForm.get(schlagwort)?.value === true
      );

      const buchDTO: Omit<Buch, '_links' | 'file'> = {
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
        schlagwoerter: gewählteSchlagwoerter,
        titel: {
          titel: this.buchForm.get('titel')!.value!,
          untertitel: this.buchForm.get('untertitel')!.value ?? undefined,
        },
      };
      console.log(buchDTO);

      // Überprüfen, ob die Datei vorhanden ist oder nicht
      if (this.ausgewähltesFile() === undefined) {
        // Wenn keine Datei hochgeladen wurde, sende das Buch ohne Datei
        this.logger.debug('Keine Datei hochgeladen', this.ausgewähltesFile());

        await this.writeService.createBuch(buchDTO, {
          mitFile: false,
          file: undefined,
        });
      } else {
        const file = this.ausgewähltesFile();
        this.logger.debug('Datei wird hochgeladen:', file);
        await this.writeService.createBuch(buchDTO, {
          mitFile: true,
          file: file,
        });
      }
    } else {
      console.log('Formular ist ungültig');
    }
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
