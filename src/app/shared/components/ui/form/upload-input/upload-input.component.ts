import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-input',
  imports: [ReactiveFormsModule],
  templateUrl: './upload-input.component.html',
  styleUrl: './upload-input.component.css',
})
export class UploadInputComponent {
  readonly buchForm = input.required<FormGroup>();

  constructor() { }

  ngOnInit(): void {
    const formControl = new FormControl();

    this.buchForm().addControl('upload', formControl);
  }

  get upload() {
    return this.buchForm().get('upload')!;
  }
}
