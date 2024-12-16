import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ArtFilterCollapseComponent } from './backend-filter/art-filter-collapse/art-filter-collapse.component';
import { LieferbarFilterCollapseComponent } from './backend-filter/lieferbar-filter-collapse/lieferbar-filter-collapse.component';
import { SchlagwoerterFilterCollapseComponent } from './backend-filter/schlagwoerter-filter-collapse/schlagwoerter-filter-collapse.component';
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
    let passendeBuecher: Buch[] = [];

    passendeBuecher = [...alleBuecher].filter(
      buch =>
        // filter nach Rating
        (this.ratingFilter() ? buch.rating! >= this.ratingFilter()! : true) &&
        // filter nach Preisuntergrenze
        (this.preisUntergrenzeFilter()
          ? this.preisUntergrenzeFilter()! <= buch.preis
          : true) &&
        // filter nach Preisobergrenze
        (this.preisObergrenzeFilter()
          ? buch.preis <= this.preisObergrenzeFilter()!
          : true) &&
        // filter nach Datumsuntergrenze
        (this.datumUntergrenzeFilter()
          ? this.datumUntergrenzeFilter()! <= buch.datum!
          : true) &&
        // filter nach Datumsobergrenze
        (this.datumObergrenzeFilter()
          ? buch.datum! <= this.datumObergrenzeFilter()!
          : true)
    );
    this.entfernteBuecher = [...alleBuecher].filter(
      buch => !passendeBuecher.includes(buch)
    );

    this.buecher.set(passendeBuecher);
  }
}
