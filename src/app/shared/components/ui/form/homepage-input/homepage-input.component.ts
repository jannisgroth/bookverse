import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-homepage-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './homepage-input.component.html',
})
export class HomepageInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() {}

  /**
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Erstellt ein FormControl für die Homepage mit einem Validator, der sicherstellt,
   * dass die Eingabe das Format einer URL hat.
   * Fügt das FormControl der FormGroup hinzu.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined, [
      Validators.pattern(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      ),
    ]);

    this.buchForm().addControl('homepage', formControl);
  }

  /**
   * Gibt das FormControl für die Homepage zurück.
   *
   * @returns Das FormControl für die Homepage, das in der FormGroup enthalten ist.
   */
  get homepage() {
    return this.buchForm().get('homepage')!;
  }
}
