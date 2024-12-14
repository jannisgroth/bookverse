import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ArtFilterCollapseComponent } from './art-filter-collapse/art-filter-collapse.component';
import { LieferbarFilterCollapseComponent } from './lieferbar-filter-collapse/lieferbar-filter-collapse.component';
import { SchlagwoerterFilterCollapseComponent } from './schlagwoerter-filter-collapse/schlagwoerter-filter-collapse.component';
import { Buch } from '../../../models/buch.model';
import { FrontendFilterComponent } from './frontend-filter/frontend-filter.component';

@Component({
  selector: 'app-filtern',
  imports: [
    ArtFilterCollapseComponent,
    LieferbarFilterCollapseComponent,
    SchlagwoerterFilterCollapseComponent,
    FrontendFilterComponent,
  ],
  templateUrl: './filtern.component.html',
  styleUrl: './filtern.component.css',
})
export class FilternComponent {
  @Input() buecher!: WritableSignal<Buch[]>;
}
