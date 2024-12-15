import { NgClass } from '@angular/common';
import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-untertitel-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './untertitel-input.component.html',
  styleUrl: './untertitel-input.component.css',
  providers: [],
})
export class UntertitelInputComponent implements OnInit {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    const formControl = new FormControl('');

    this.buchForm().addControl('untertitel', formControl);
  }

  get untertitel() {
    return this.buchForm().get('untertitel')!;
  }
}
