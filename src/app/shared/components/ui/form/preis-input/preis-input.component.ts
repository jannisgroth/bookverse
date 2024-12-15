import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-preis-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './preis-input.component.html',
  styleUrl: './preis-input.component.css',
})
export class PreisInputComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    const formControl = new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]);

    this.buchForm().addControl('preis', formControl);
  }

  get preis() {
    return this.buchForm().get('preis')!;
  }
}
