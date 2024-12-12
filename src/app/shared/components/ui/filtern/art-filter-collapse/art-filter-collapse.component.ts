import { Component, Injector, QueryList, ViewChildren } from '@angular/core';
import { BuchArt } from '../../../../models/buch.model';
import { ReadService } from '../../../../../core/api/http-get.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-art-filter-collapse',
  imports: [CommonModule],
  templateUrl: './art-filter-collapse.component.html',
  styleUrl: './art-filter-collapse.component.css',
})
export class ArtFilterCollapseComponent {
  private readService: ReadService;
  private artFilter;
  options = [
    { value: 'EPUB', label: 'E-Pub' },
    { value: 'HARDCOVER', label: 'Hardcover' },
    { value: 'PAPERBACK', label: 'Paperback' },
  ];

  constructor(injector: Injector) {
    this.readService = injector.get(ReadService);
    this.artFilter = this.readService.artFilter;
  }

  artFilterSetter(target: EventTarget) {
    this.artFilter.set((target as HTMLSelectElement).value as BuchArt);
    this.readService.getBuecherMitBild();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const radioInputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="radio"][name="radio-10"]'
      );
      radioInputs.forEach(radio => {
        radio.checked = false;
      });
      this.artFilter.set(undefined);
      setTimeout(() => {
        this.readService.getBuecherMitBild();
      }, 200);
    }
  }
}
