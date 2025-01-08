import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datum-input',
  imports: [ReactiveFormsModule],
  templateUrl: './datum-input.component.html',
})
export class DatumInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() {}

  /**
   * Fügt dem Formular eine FormControl für das Datum hinzu.
   * Die Initialisierung wird im ngOnInit-Lifecycle-Hook durchgeführt,
   * damit die FormControl erstellt wird, wenn die Komponente initialisiert wird.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined);

    this.buchForm().addControl('datum', formControl);
  }

  /**
   * Liefert das FormControl für das Datum-Feld aus der FormGroup.
   * Dieses Control wird verwendet, um die Datum-Eingabe im Formular zu verwalten.
   */
  get datum() {
    return this.buchForm().get('datum')!;
  }
}
