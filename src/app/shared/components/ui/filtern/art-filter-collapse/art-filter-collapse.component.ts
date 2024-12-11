import { Component } from '@angular/core';
import { ReadService } from '../../../../../core/api/http-get.service';
import { BuchArt } from '../../../../models/buch.model';

@Component({
  selector: 'app-art-filter-collapse',
  imports: [],
  templateUrl: './art-filter-collapse.component.html',
  styleUrl: './art-filter-collapse.component.css',
})
export class ArtFilterCollapseComponent {
  constructor(public readService: ReadService) {}

  artFilterSetter(target: EventTarget) {
    const target1 = target as HTMLSelectElement;
    const value = target1.value;
    this.readService.artFilter.set(
      (target as HTMLSelectElement).value as BuchArt
    );
  }
}
