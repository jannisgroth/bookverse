import { Component, Input, WritableSignal } from '@angular/core';
import { ArtFilterCollapseComponent } from './art-filter-collapse/art-filter-collapse.component';
import { LieferbarFilterCollapseComponent } from './lieferbar-filter-collapse/lieferbar-filter-collapse.component';
import { SchlagwoerterFilterCollapseComponent } from './schlagwoerter-filter-collapse/schlagwoerter-filter-collapse.component';

@Component({
  selector: 'app-filtern',
  imports: [
    ArtFilterCollapseComponent,
    LieferbarFilterCollapseComponent,
    SchlagwoerterFilterCollapseComponent,
  ],
  templateUrl: './filtern.component.html',
  styleUrl: './filtern.component.css',
})
export class FilternComponent {}
