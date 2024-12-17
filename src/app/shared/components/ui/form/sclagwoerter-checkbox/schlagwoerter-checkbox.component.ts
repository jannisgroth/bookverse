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
  buchForm = input.required<FormGroup>();
  protected schlagwoerter = ['JAVASCRIPT', 'JAVA', 'PYTHON', 'TYPESCRIPT'];


  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(false);

    this.schlagwoerter.forEach(name => {
      this.buchForm().addControl(name, formControl);
    });
  }
}
