import {
  Component,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ArtFilterCollapseComponent } from './art-filter-collapse/art-filter-collapse.component';
import { LieferbarFilterCollapseComponent } from './lieferbar-filter-collapse/lieferbar-filter-collapse.component';
import { SchlagwoerterFilterCollapseComponent } from './schlagwoerter-filter-collapse/schlagwoerter-filter-collapse.component';
import { Buch } from '../../../models/buch.model';
import { RatingFilterCollapseComponent } from './frontend-filter/rating-filter-collapse/rating-filter-collapse.component';

@Component({
  selector: 'app-filtern',
  imports: [
    ArtFilterCollapseComponent,
    LieferbarFilterCollapseComponent,
    SchlagwoerterFilterCollapseComponent,
    RatingFilterCollapseComponent,
  ],
  templateUrl: './filtern.component.html',
  styleUrl: './filtern.component.css',
})
export class FilternComponent {
  @Input() buecher!: WritableSignal<Buch[]>;
  private entfernteBuecher: Buch[];
  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly preisObergrenzeFilter = signal<string | undefined>(undefined);
  readonly rabattFilter = signal<string | undefined>(undefined);
  readonly datumUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly datumObergrenzeFilter = signal<Date | undefined>(undefined);

  constructor() {
    this.entfernteBuecher = [];
  }

  /**
   * Filtert eine Buchliste anhand der Kriterien, die sich nicht über eine
   * GET Request filtern lassen.
   */
  frontendFilter() {
    const alleBuecher = [...this.buecher(), ...this.entfernteBuecher];
    let passendeElemente: Buch[] = [];
    let herausgefilterteElemente: Buch[] = [];

    alleBuecher.forEach(buch => {
      // Rating Filter ist gesetzt und kleiner gleich Buchrating
      this.ratingFilter() && this.ratingFilter()! <= buch.rating!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      // Filter für Preisober- und Untergrenze sind gesetzt und
      // Buchpreis ist dazwischen
      // Typecasting von string zu number mit Unary Plus Operator (+)
      this.preisUntergrenzeFilter() &&
      this.preisObergrenzeFilter() &&
      +this.preisUntergrenzeFilter()! <= +buch.preis &&
      +buch.preis <= +this.preisObergrenzeFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      // Filter für Rabatt ist gesetzt und kleiner gleich Buchrabatt
      this.rabattFilter() && this.rabattFilter()! <= buch.rabatt!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);

      // Filter für Datumsober- und Untergrenze sind gesetzt und
      // Buchdatum ist dazwischen
      this.datumUntergrenzeFilter() &&
      this.datumObergrenzeFilter() &&
      this.datumUntergrenzeFilter()! <= buch.datum! &&
      buch.datum! <= this.datumObergrenzeFilter()!
        ? passendeElemente.push(buch)
        : herausgefilterteElemente.push(buch);
    });

    this.buecher.set(passendeElemente);
    this.entfernteBuecher = herausgefilterteElemente;
  }
}
