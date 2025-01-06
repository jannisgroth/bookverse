import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './buchart-drop-down.component.html',
})
export class BuchartDropDownComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Erzeugt ein FormControl für die Buchart und fügt es der FormGroup hinzu.
   * Das FormControl hat einen Validator, der sicherstellt, dass nur die Werte
   * "wählen", "EPUB", "PAPERBACK" und "HARDCOVER" gültig sind.
   */
  ngOnInit(): void {
    const formControl = new FormControl('wählen', [
      Validators.pattern(/^(wählen|EPUB|PAPERBACK|HARDCOVER)$/),
    ]);

    this.buchForm().addControl('buchart', formControl);
  }

  /**
   * Returns the FormControl for 'buchart'.
   */
  get buchart() {
    return this.buchForm().get('buchart')!;
  }
}
