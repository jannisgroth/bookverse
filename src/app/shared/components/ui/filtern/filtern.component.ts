import {
  Component,
  Injector,
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
import { ReadService } from '../../../../core/api/http-read.service';

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
  readonly readService: ReadService;

  readonly artFilter;
  readonly lieferbarFilter;
  readonly schlagworterFilter;
  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisFilter = signal<string | undefined>(undefined);
  readonly rabattFilter = signal<string | undefined>(undefined);
  readonly datumUntergrenzeFilter = signal<string | undefined>(undefined);
  readonly datumObergrenzeFilter = signal<Date | undefined>(undefined);

  constructor(injector: Injector) {
    this.readService = injector.get(ReadService);
    this.artFilter = this.readService.artFilter;
    this.lieferbarFilter = this.readService.lieferbarFilter;
    this.schlagworterFilter = this.readService.schlagwoerterFilter;
  }

  /**
   * Filtert eine Buchliste anhand der Kriterien, die sich nicht über eine
   * GET Request filtern lassen.
   */
  frontendFilter() {
    this.readService.getBuecherMitBild(this.buecher());

    const passendeBuecher = [...this.buecher()()].filter(
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
    this.buecher().set(passendeBuecher);
  }
}
