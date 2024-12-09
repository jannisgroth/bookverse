import { Component } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { SelectComponent } from "../select/select.component";
import { UploadInputComponent } from "../upload-input/upload-input.component";
import { RatingComponent } from "../rating/rating.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formular',
  imports: [InputComponent, SelectComponent, UploadInputComponent, RatingComponent, CheckboxComponent, ReactiveFormsModule],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.css'
})
export class FormularComponent {

  buchArtPattern = /^(EPUB|PAPERBACK|HARDCOVER)$/;
  isbnPattern = /^(?:\d{9}[\dX]|\d{13})$/;
  buchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buchForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.pattern(this.isbnPattern)]],
      rating: [undefined, [Validators.required, Validators.min(1), Validators.max(5)]],
      art: [undefined, [Validators.required, Validators.pattern(this.buchArtPattern)]],
      preis: [undefined, [Validators.min(0)]],
      rabatt: ['', Validators.min(0)],
      lieferbar: [true, Validators.required],
      datum: [undefined, Validators.required],
      homepage: [''],
      schlagwoerter: [undefined, Validators.required],
      titel: ['', Validators.required]
    });
  }
}
