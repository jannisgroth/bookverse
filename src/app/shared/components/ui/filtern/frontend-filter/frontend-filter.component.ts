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
  entfernteBuecher: Buch[];
  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly preisObergrenzeFilter = signal<string | undefined>(undefined);
  readonly rabattFilter = signal<string | undefined>(undefined);
  readonly datumUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly datumObergrenzeFilter = signal<Date | undefined>(undefined);

  constructor() {
    this.entfernteBuecher = [];
  }

  frontendFilter() {
    const alleBuecher = this.buecher().concat(this.entfernteBuecher);
    let passendeElemente: Buch[] = [];
    let herausgefilterteElemente: Buch[] = [];

    alleBuecher.forEach(buch => {
      buch.rating! >= this.ratingFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      //Typecasting mit Unary Plus Operator (+)
      +this.preisUntergrenzeFilter()! <= +buch.preis &&
      +buch.preis <= +this.preisObergrenzeFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      buch.rabatt! >= this.rabattFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      this.datumUntergrenzeFilter()! <= buch.datum! &&
      buch.datum! <= this.datumObergrenzeFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);
    });

    this.buecher.set(passendeElemente);
    this.entfernteBuecher = herausgefilterteElemente;
  }
}
