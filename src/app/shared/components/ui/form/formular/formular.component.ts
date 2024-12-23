import { Component } from '@angular/core';
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
import { Buch } from '../../../../models/buch.model';
import { LieferbarCheckboxComponent } from '../lieferbar-checkbox/lieferbar-checkbox.component';
import { WriteService } from '../../../../../core/api/http-write.service';

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

  constructor(private writeService: WriteService) {}
  async onSubmit() {
    if (this.buchForm.valid) {
      console.log('valide eingaben');
      const gewählteSchlagwoerter = this.schlagwoerter.filter(
        schlagwort => this.buchForm.get(schlagwort)?.value === true
      );

      const buchDTO: Omit<Buch, '_links' | 'file'> = {
        isbn: this.buchForm.get('isbn')!.value,
        rating: Number(this.buchForm.get('rating')?.value),
        art:
          this.buchForm.get('buchart')?.value === 'wählen'
            ? undefined
            : this.buchForm.get('buchart')?.value,
        preis: String(this.buchForm.get('preis')!.value),
        rabatt: this.buchForm.get('rabatt')?.value
          ? (Number(this.buchForm.get('rabatt')?.value) / 100).toFixed(3)
          : undefined,
        lieferbar: this.buchForm.get('lieferbar')?.value ?? undefined,
        datum: this.buchForm.get('datum')?.value ?? undefined,
        homepage: this.buchForm.get('homepage')?.value ?? undefined,
        schlagwoerter: gewählteSchlagwoerter,
        titel: {
          titel: this.buchForm.get('titel')?.value!,
          untertitel: this.buchForm.get('untertitel')?.value ?? undefined,
        },
        //file: this.buchForm.get('upload')?.value ?? undefined,
      };
      console.log(buchDTO);

      await this.writeService.createBuch(buchDTO);
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
