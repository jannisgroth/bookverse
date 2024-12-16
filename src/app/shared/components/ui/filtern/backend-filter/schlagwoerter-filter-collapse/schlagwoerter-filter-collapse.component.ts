import { Component, Injector, input, WritableSignal } from '@angular/core';

import { ReadService } from '../../../../../../core/api/http-read.service';
import { CommonModule } from '@angular/common';
import { Buch } from '../../../../../models/buch.model';

@Component({
  selector: 'app-schlagwoerter-filter-collapse',
  imports: [CommonModule],
  templateUrl: './schlagwoerter-filter-collapse.component.html',
  styleUrl: './schlagwoerter-filter-collapse.component.css',
})
export class SchlagwoerterFilterCollapseComponent {
  readonly buecher = input.required<WritableSignal<Buch[]>>();
  private readService: ReadService;
  private schlagwoerterFilter;
  options = [
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  constructor(injector: Injector) {
    this.readService = injector.get(ReadService);
    this.schlagwoerterFilter = this.readService.schlagwoerterFilter;
  }

  schlagwoerterFilterSetter(target: EventTarget) {
    const checkboxInput = (target as HTMLInputElement).checked;
    const value = (target as HTMLInputElement).value;
    this.schlagwoerterFilter.update(schlagwoerter =>
      checkboxInput
        ? schlagwoerter.concat(value)
        : schlagwoerter.filter(item => item !== value)
    );
    this.readService.getBuecherMitBild(this.buecher());
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const checkboxInputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"][name="schlagwoertercheckbox"]'
      );
      checkboxInputs.forEach(checkbox => {
        checkbox.checked = false;
      });
      this.schlagwoerterFilter.set([]);
      setTimeout(() => {
        this.readService.getBuecherMitBild(this.buecher());
      }, 200);
    }
  }
}
