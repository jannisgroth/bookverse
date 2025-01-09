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
import { RatingFilterCollapseComponent } from './backend-filter/rating-filter-collapse/rating-filter-collapse.component';
import { PreisFilterCollapseComponent } from './backend-filter/preis-filter-collapse/preis-filter-collapse.component';
import { RabattFilterCollapseComponent } from './backend-filter/rabatt-filter-collapse/rabatt-filter-collapse.component';
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
})
export class FilternComponent {
  readonly buecher = input(signal<Buch[]>([]));
  readonly readService: ReadService;

  readonly artFilter;
  readonly lieferbarFilter;
  readonly schlagworterFilter;
  readonly ratingFilter;
  readonly preisFilter;
  readonly rabattFilter;

  constructor(injector: Injector) {
    this.readService = injector.get(ReadService);
    this.artFilter = this.readService.artFilter;
    this.lieferbarFilter = this.readService.lieferbarFilter;
    this.schlagworterFilter = this.readService.schlagwoerterFilter;
    this.ratingFilter = this.readService.ratingFilter;
    this.preisFilter = this.readService.preisFilter;
    this.rabattFilter = this.readService.rabattFilter;
  }

  /**
   * Filtert eine Buchliste anhand der Kriterien, die sich nicht über eine
   * GET Request filtern lassen.
   */
  filter() {
    this.readService.getBuecherMitBild(this.buecher());
  }
}
