import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-isbn-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './isbn-input.component.html',
})
export class IsbnInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() {}

  /**
   * Initialisiert das ISBN FormControl mit erforderlichem und
   * Muster-Validator und fügt es der FormGroup hinzu.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined, [
      Validators.required,
      Validators.pattern(/^(97[89]-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1})$/),
    ]);

    this.buchForm().addControl('isbn', formControl);
  }

  /**
   * Liefert das FormControl für das ISBN
   * @returns FormControl für das ISBN
   */
  get isbn() {
    return this.buchForm().get('isbn')!;
  }
}
