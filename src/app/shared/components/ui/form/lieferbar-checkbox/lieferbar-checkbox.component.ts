import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lieferbar-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './lieferbar-checkbox.component.html',
  styleUrl: './lieferbar-checkbox.component.css'
})
export class LieferbarCheckboxComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(false);

    this.buchForm().addControl('lieferbar', formControl);
  }

  get lieferbar() {
    return this.buchForm().get('lieferbar')!;
  }
}
