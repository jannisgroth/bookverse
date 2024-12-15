import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-rabatt-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './rabatt-input.component.html',
  styleUrl: './rabatt-input.component.css',
})
export class RabattInputComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    const formControl = new FormControl('', [
      Validators.min(0),
      Validators.max(100),
    ]);

    this.buchForm().addControl('rabatt', formControl);
  }

  get rabatt() {
    return this.buchForm().get('rabatt')!;
  }
}
