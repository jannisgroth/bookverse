import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lieferbar-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './lieferbar-checkbox.component.html',
})
export class LieferbarCheckboxComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  /**
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Erstellt ein FormControl für das 'lieferbar' Kontrollkästchen und fügt es der FormGroup hinzu.
   * Der Standardwert für das Kontrollkästchen ist 'false'.
   */
  ngOnInit(): void {
    const formControl = new FormControl(false);

    this.buchForm().addControl('lieferbar', formControl);
  }

  /**
   * Liefert ein FormControl-Objekt zurück, das das
   * Kontrollkästchen 'Lieferbar' repräsentiert.
   * Standardwert ist 'false'.
   */
  get lieferbar() {
    return this.buchForm().get('lieferbar')!;
  }
}
