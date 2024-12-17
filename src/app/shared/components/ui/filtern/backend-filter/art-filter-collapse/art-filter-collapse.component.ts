import {
  Component,
  Injector,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Buch, BuchArt } from '../../../../../models/buch.model';
import { ReadService } from '../../../../../../core/api/http-read.service';
import { CommonModule } from '@angular/common';
import { FilternComponent } from '../../filtern.component';
@Component({
  selector: 'app-art-filter-collapse',
  imports: [CommonModule],
  templateUrl: './art-filter-collapse.component.html',
  styleUrl: './art-filter-collapse.component.css',
})
export class ArtFilterCollapseComponent {
  readonly artFilter = input(signal<BuchArt | undefined>(undefined));
  private filter: FilternComponent;
  options = [
    { value: 'EPUB', label: 'E-Pub' },
    { value: 'HARDCOVER', label: 'Hardcover' },
    { value: 'PAPERBACK', label: 'Paperback' },
  ];

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  artFilterSetter(target: EventTarget) {
    this.artFilter().set((target as HTMLSelectElement).value as BuchArt);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const radioInputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="radio"][name="radio-10"]'
      );
      radioInputs.forEach(radio => {
        radio.checked = false;
      });
      this.artFilter().set(undefined);
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
