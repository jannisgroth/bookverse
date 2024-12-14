import { Component } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { UploadInputComponent } from "../upload-input/upload-input.component";
import { RatingComponent } from "../rating/rating.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropDownComponent } from '../drop-down/drop-down.component';


@Component({
  selector: 'app-formular',
  imports: [InputComponent, UploadInputComponent, RatingComponent, CheckboxComponent, DropDownComponent, ReactiveFormsModule],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css'
})
export class FormularComponent {

  buchArtPattern = /^(EPUB|PAPERBACK|HARDCOVER)$/;
  isbnPattern = /^(?:\d{9}[\dX]|\d{13})$/;
  buchForm = new FormGroup({});



  // isbn: new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/)
  // ]),
  // rating: new FormControl('', [
  //   Validators.required,
  //   Validators.min(1),
  //   Validators.max(5)
  // ]),
  // art: new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(this.buchArtPattern)
  // ]),
  // preis: new FormControl('', [
  //   Validators.min(0)
  // ]),
  // rabatt: new FormControl('', [
  //   Validators.min(0),
  //   Validators.max(100)
  // ]),
  // datum: new FormControl('', [
  //   Validators.required
  // ]),
  // homepage: new FormControl('', [
  //   Validators.pattern(
  //     /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
  // ]),
  // titel: new FormControl('', [
  //   Validators.required,
  //   ]),
  // unterTitel: new FormControl('', [
  //   Validators.required
  // ])


  onSubmit() {
    if (this.buchForm.valid) {
      console.log(this.buchForm.value);
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
