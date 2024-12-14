import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: []
})
export class InputComponent implements OnInit {
  // Signal für die FormGroup
  buchForm = input.required<FormGroup>();

  titelLabel = input<string>()
  //@Input() titel!: string;
  @Input() placeholder?: string;
  @Input() iconPath!: string;
  @Input() type!: string;
  @Input() step?: string;

  // FormControl für das Input-Feld (ohne sofortige Zuordnung zur FormGroup)

  constructor() { }

  ngOnInit(): void {
    //const form = this.buchForm().addControl('', [Validators.maxLength(3)]);
    const formControl = new FormControl('', [Validators.required, Validators.maxLength(3)]);

    this.buchForm().addControl("titel", formControl);
  }

  get titel() {
    return this.buchForm().get('titel')!;
  }
}
