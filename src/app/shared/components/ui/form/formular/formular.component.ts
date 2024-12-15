import { Component } from '@angular/core';
import { TitelInputComponent } from '../titel-input/titel-input.component';
import { UploadInputComponent } from '../upload-input/upload-input.component';
import { RatingComponent } from '../rating/rating.component';
import { SchlagwoerterCheckboxComponent } from '../sclagwoerter-checkbox/schlagwoerter-checkbox.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuchartDropDownComponent } from '../buchart-drop-down/buchart-drop-down.component';
import { IsbnInputComponent } from '../isbn-input/isbn-input.component';
import { UntertitelInputComponent } from '../untertitel-input/untertitel-input.component';
import { HomepageInputComponent } from '../homepage-input/homepage-input.component';
import { DatumInputComponent } from '../datum-input/datum-input.component';
import { PreisInputComponent } from '../preis-input/preis-input.component';
import { RabattInputComponent } from '../rabatt-input/rabatt-input.component';

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
    RatingComponent,
    UploadInputComponent
  ],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css',
})
export class FormularComponent {
  isbnPattern = /^(?:\d{9}[\dX]|\d{13})$/;
  buchForm = new FormGroup({});

  // rating: new FormControl('', [
  //   Validators.required,
  //   Validators.min(1),
  //   Validators.max(5)
  // ]),

  onSubmit() {
    if (this.buchForm.valid) {
      console.log(this.buchForm.value);
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
