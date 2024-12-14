import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.css'
})
export class RatingInputComponent {

  buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    //const form = this.buchForm().addControl('', [Validators.maxLength(3)]);
    const formControl = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]);

    this.buchForm().addControl("rating", formControl);
  }

  get rating() {
    return this.buchForm().get('rating')!;
  }
}

