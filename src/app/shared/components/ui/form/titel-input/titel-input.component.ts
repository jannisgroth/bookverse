import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-titel-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './titel-input.component.html',
  providers: [],
})
export class TitelInputComponent implements OnInit {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl(undefined, [Validators.required]);
    this.buchForm().addControl('titel', formControl);
  }

  get titel() {
    return this.buchForm().get('titel')!;
  }
}
