import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datum-input',
  imports: [ReactiveFormsModule],
  templateUrl: './datum-input.component.html',
  styleUrl: './datum-input.component.css',
})
export class DatumInputComponent {
  // Signal für die FormGroup
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(undefined);

    this.buchForm().addControl('datum', formControl);
  }

  get datum() {
    return this.buchForm().get('datum')!;
  }
}
