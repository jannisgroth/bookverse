import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-untertitel-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './untertitel-input.component.html',
  providers: [],
})
export class UntertitelInputComponent implements OnInit {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }


  /**
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Erstellt ein FormControl für den Untertitel und fuegt es der FormGroup hinzu.
   */
  ngOnInit(): void {
    const formControl = new FormControl(undefined);

    this.buchForm().addControl('untertitel', formControl);
  }

  /**
   * Gibt das FormControl für den Untertitel zurück.
   */
  get untertitel() {
    return this.buchForm().get('untertitel')!;
  }
}
