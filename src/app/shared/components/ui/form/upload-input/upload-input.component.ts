import { Component, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularComponent } from '../formular/formular.component';

@Component({
  selector: 'app-upload-input',
  imports: [ReactiveFormsModule],
  templateUrl: './upload-input.component.html',
})
@Injectable({ providedIn: 'root' })
export class UploadInputComponent {
  constructor(private formular: FormularComponent) { }

  /**
   * @description Wird aufgerufen, wenn der Nutzer eine Datei auswählt.
   *              Wenn eine Datei ausgewählt wurde, wird diese im Formular
   *              gespeichert. Wenn keine Datei ausgewählt wurde, wird das
   *              FormControl auf undefined gesetzt.
   * @param event Das Event, das aufgerufen wurde, wenn der Nutzer eine Datei auswählt.
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0]; // Ausgewählte Datei
      this.formular.setSelectedFile(file);
    } else {
      this.formular.setSelectedFile(undefined); // Leeres FormControl, wenn keine Datei
    }
  }
}
