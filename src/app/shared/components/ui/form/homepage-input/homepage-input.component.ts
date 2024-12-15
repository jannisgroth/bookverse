import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-homepage-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './homepage-input.component.html',
  styleUrl: './homepage-input.component.css',
})
export class HomepageInputComponent {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    const formControl = new FormControl('', [
      Validators.pattern(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      ),
    ]);

    this.buchForm().addControl('homepage', formControl);
  }

  get homepage() {
    return this.buchForm().get('homepage')!;
  }
}
