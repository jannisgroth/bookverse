import { NgClass } from '@angular/common';
import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-titel-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './titel-input.component.html',
  styleUrl: './titel-input.component.css',
  providers: []
})
export class TitelInputComponent implements OnInit {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    //const form = this.buchForm().addControl('', [Validators.maxLength(3)]);
    const formControl = new FormControl('', [Validators.required]);

    this.buchForm().addControl("titel", formControl);
  }

  get titel() {
    return this.buchForm().get('titel')!;
  }
}
