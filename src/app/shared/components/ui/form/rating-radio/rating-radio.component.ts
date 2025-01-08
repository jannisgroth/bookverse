import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  imports: [ReactiveFormsModule],
  templateUrl: './rating-radio.component.html',
})
export class RatingRadioComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() {}

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Erzeugt ein FormControl fuer die Bewertung und fuegt es der FormGroup hinzu.
   * Der Standardwert fuer die Bewertung ist 5.
   */
  ngOnInit(): void {
    const formControl = new FormControl(5);

    this.buchForm().addControl('rating', formControl);
  }
}
