import { Component, Injectable, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularComponent } from '../../formular/formular.component';

@Component({
  selector: 'app-upload-input',
  imports: [ReactiveFormsModule],
  templateUrl: './upload-input.component.html',
  styleUrl: './upload-input.component.css',
})
@Injectable({ providedIn: 'root' })
export class UploadInputComponent {
  readonly buchForm = input.required<FormGroup>();

  constructor(private formular: FormularComponent) { }

  ngOnInit(): void {
    const formControl = new FormControl(null);

    this.buchForm().addControl('upload', formControl);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0]; // Ausgewählte Datei
      console.log('Datei ausgewählt:', file, file instanceof File);
      this.formular.setSelectedFile(file);
    } else {
      this.formular.setSelectedFile(undefined); // Leeres FormControl, wenn keine Datei
    }
  }
}