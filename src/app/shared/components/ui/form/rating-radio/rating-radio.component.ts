import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-rating',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './rating-radio.component.html',
  styleUrl: './rating-radio.component.css',
})
export class RatingRadioComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();


  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(false);

    this.buchForm().addControl('rating', formControl);
  }

  getRating(): number {
    return this.buchForm().get('rating')?.value;
  }
}
