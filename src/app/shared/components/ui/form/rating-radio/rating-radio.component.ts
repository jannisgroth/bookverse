import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './rating-radio.component.html',
  styleUrl: './rating-radio.component.css',
})
export class RatingRadioComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    const formControl = new FormControl('');

    this.buchForm().addControl('rating', formControl);
    this.buchForm;
  }

  get rating() {
    return this.buchForm().get('rating')!;
  }
}
