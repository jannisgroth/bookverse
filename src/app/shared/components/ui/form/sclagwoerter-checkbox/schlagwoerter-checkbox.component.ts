import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schlagwoerter-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './schlagwoerter-checkbox.component.html',
})
export class SchlagwoerterCheckboxComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();
  constructor() { }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Fügt den vier Schlagwörtern 'JAVASCRIPT', 'JAVA', 'PYTHON' und 'TYPESCRIPT'
   * jeweils ein FormControl mit einem initialen Wert von 'false' zu der FormGroup hinzu.
   */
  ngOnInit(): void {
    this.buchForm().addControl('JAVASCRIPT', new FormControl(false));
    this.buchForm().addControl('JAVA', new FormControl(false));
    this.buchForm().addControl('PYTHON', new FormControl(false));
    this.buchForm().addControl('TYPESCRIPT', new FormControl(false));
  }
}
