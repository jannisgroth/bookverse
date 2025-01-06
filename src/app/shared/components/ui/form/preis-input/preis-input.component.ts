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
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Erzeugt ein FormControl für den Preis und fügt es der FormGroup hinzu.
   * Das FormControl hat zwei Validator, die sicherstellen, dass der Preis
   * nicht leer ist und nicht negativ ist.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined, [
      Validators.required,
      Validators.min(0),
    ]);

    this.buchForm().addControl('preis', formControl);
  }

  /**
   * Gibt das FormControl für den Preis zurück.
   *
   * @returns Das FormControl für den Preis, das in der FormGroup enthalten ist.
   */
  get preis() {
    return this.buchForm().get('preis')!;
  }
}
