import {
  Component,
  Injector,
  input,
  signal,
  WritableSignal,
} from '@angular/core';

import { ReadService } from '../../../../../../core/api/http-read.service';
import { CommonModule } from '@angular/common';
import { Buch } from '../../../../../models/buch.model';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-schlagwoerter-filter-collapse',
  imports: [CommonModule],
  templateUrl: './schlagwoerter-filter-collapse.component.html',
  styleUrl: './schlagwoerter-filter-collapse.component.css',
})
export class SchlagwoerterFilterCollapseComponent {
  readonly schlagwoerterFilter = input(signal<string[]>([]));
  private filter: FilternComponent;
  options = [
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  schlagwoerterFilterSetter(target: EventTarget) {
    const checkboxInput = (target as HTMLInputElement).checked;
    const value = (target as HTMLInputElement).value;
    this.schlagwoerterFilter().update(schlagwoerter =>
      checkboxInput
        ? schlagwoerter.concat(value)
        : schlagwoerter.filter(item => item !== value)
    );
    this.filter.filter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const checkboxInputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"][name="schlagwoertercheckbox"]'
      );
      checkboxInputs.forEach(checkbox => {
        checkbox.checked = false;
      });
      this.schlagwoerterFilter().set([]);
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
