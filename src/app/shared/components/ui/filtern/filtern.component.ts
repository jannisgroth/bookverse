import { Component, Input, WritableSignal } from '@angular/core';
import { ArtFilterCollapseComponent } from './art-filter-collapse/art-filter-collapse.component';

@Component({
  selector: 'app-filtern',
  imports: [ArtFilterCollapseComponent],
  templateUrl: './filtern.component.html',
  styleUrl: './filtern.component.css',
})
export class FilternComponent {}
