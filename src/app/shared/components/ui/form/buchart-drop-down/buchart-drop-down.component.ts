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
  styleUrl: './buchart-drop-down.component.css',
})
export class BuchartDropDownComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl('wählen', [
      Validators.pattern(/^(wählen|EPUB|PAPERBACK|HARDCOVER)$/),
    ]);

    this.buchForm().addControl('buchart', formControl);
  }

  get buchart() {
    return this.buchForm().get('buchart')!;
  }
}
