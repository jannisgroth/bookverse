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
})
export class RabattInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() {}

  /**
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Erstellt ein FormControl fuer den Rabatt mit einem Validator, der sicherstellt,
   * dass die Eingabe zwischen 0 und 100 liegt.
   * Fuegt das FormControl der FormGroup hinzu.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined, [
      Validators.min(0),
      Validators.max(100),
    ]);

    this.buchForm().addControl('rabatt', formControl);
  }

  /**
   * Gibt das FormControl für den Rabatt zurück.
   */
  get rabatt() {
    return this.buchForm().get('rabatt')!;
  }
}
