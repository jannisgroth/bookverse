import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  imports: [ReactiveFormsModule],
  templateUrl: './rating-radio.component.html',
  styleUrl: './rating-radio.component.css',
})
export class RatingRadioComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();


  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(5);

    this.buchForm().addControl('rating', formControl);
  }
}
