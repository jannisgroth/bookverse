import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Buch } from '../../../models/buch.model';
import { LieferbarFilterCollapseComponent } from './backend-filter/lieferbar-filter-collapse/lieferbar-filter-collapse.component';
import { ArtFilterCollapseComponent } from './backend-filter/art-filter-collapse/art-filter-collapse.component';
import { SchlagwoerterFilterCollapseComponent } from './backend-filter/schlagwoerter-filter-collapse/schlagwoerter-filter-collapse.component';
import { RatingFilterCollapseComponent } from './frontend-filter/rating-filter-collapse/rating-filter-collapse.component';
import { PreisFilterCollapseComponent } from './frontend-filter/preis-filter-collapse/preis-filter-collapse.component';
import { RabattFilterCollapseComponent } from './frontend-filter/rabatt-filter-collapse/rabatt-filter-collapse.component';

@Component({
  selector: 'app-filtern',
  imports: [
    LieferbarFilterCollapseComponent,
    ArtFilterCollapseComponent,
    SchlagwoerterFilterCollapseComponent,
    RatingFilterCollapseComponent,
    PreisFilterCollapseComponent,
    RabattFilterCollapseComponent,
  ],
  templateUrl: './filtern.component.html',
  styleUrl: './filtern.component.css',
})
export class FilternComponent {
  readonly buecher = input(signal<Buch[]>([]));
  private entfernteBuecher: Buch[];

  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisFilter = signal<string | undefined>(undefined);
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
    const alleBuecher = [...this.buecher()(), ...this.entfernteBuecher];
    let passendeBuecher: Buch[] = [];

    passendeBuecher = [...alleBuecher].filter(
      buch =>
        // filter nach Rating
        (this.ratingFilter() ? buch.rating! >= this.ratingFilter()! : true) &&
        // filter nach Preis
        (this.preisFilter()
          ? +buch.preis * (1 - +buch.rabatt!) <= +this.preisFilter()!
          : true) &&
        //filter nach Rabatt
        (this.rabattFilter() ? +buch.rabatt! >= +this.rabattFilter()! : true) &&
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

    this.buecher().set(passendeBuecher);
  }
}
