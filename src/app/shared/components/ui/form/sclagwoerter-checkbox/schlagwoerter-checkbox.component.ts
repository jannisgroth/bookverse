import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-schlagwoerter-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './schlagwoerter-checkbox.component.html',
  styleUrl: './schlagwoerter-checkbox.component.css',
})
export class SchlagwoerterCheckboxComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();
  constructor() { }

  ngOnInit(): void {
    this.buchForm().addControl('JAVASCRIPT', new FormControl(false));
    this.buchForm().addControl('JAVA', new FormControl(false));
    this.buchForm().addControl('PYTHON', new FormControl(false));
    this.buchForm().addControl('TYPESCRIPT', new FormControl(false));
  }
}
