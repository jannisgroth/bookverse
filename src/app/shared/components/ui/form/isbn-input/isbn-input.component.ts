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
  styleUrl: './isbn-input.component.css',
})
export class IsbnInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/),
    ]);

    this.buchForm().addControl('isbn', formControl);
  }

  get isbn() {
    return this.buchForm().get('isbn')!;
  }
}
