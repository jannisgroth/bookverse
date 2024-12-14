import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Buch } from '../../../../models/buch.model';

@Component({
  selector: 'app-frontend-filter',
  imports: [],
  templateUrl: './frontend-filter.component.html',
  styleUrl: './frontend-filter.component.css',
})
export class FrontendFilterComponent {
  @Input() buecher!: WritableSignal<Buch[]>;
  gefilterteBuecher: Buch[];
  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly preisObergrenzeFilter = signal<string | undefined>(undefined);
  readonly rabattFilter = signal<string | undefined>(undefined);
  readonly datumUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly datumObergrenzeFilter = signal<Date | undefined>(undefined);

  constructor() {
    this.gefilterteBuecher = [];
  }

  frontendFilter() {}
}
