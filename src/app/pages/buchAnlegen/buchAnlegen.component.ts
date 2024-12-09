import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/ui/form/input/input.component';
import { SelectComponent } from '../../shared/components/ui/form/select/select.component';
import { UploadInputComponent } from '../../shared/components/ui/form/upload-input/upload-input.component';
import { RatingComponent } from '../../shared/components/ui/form/rating/rating.component';
import { CheckboxComponent } from '../../shared/components/ui/form/checkbox/checkbox.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularComponent } from '../../shared/components/ui/form/formular/formular.component';

@Component({
  selector: 'app-buchAnlegen',
  imports: [FormularComponent],
  templateUrl: './buchAnlegen.component.html',
  styleUrl: './buchAnlegen.component.css'
})
export class BuchAnlegenComponent {
}
