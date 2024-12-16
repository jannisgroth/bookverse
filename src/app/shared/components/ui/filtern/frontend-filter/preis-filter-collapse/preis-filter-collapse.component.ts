import { Component, Input, WritableSignal } from '@angular/core';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-preis-filter-collapse',
  imports: [],
  templateUrl: './preis-filter-collapse.component.html',
  styleUrl: './preis-filter-collapse.component.css',
})
export class PreisFilterCollapseComponent {
  @Input() preisFilter!: WritableSignal<string | undefined>;

  readonly filter: FilternComponent;
  tooltip: boolean = false;

  constructor() {
    this.filter = new FilternComponent();
  }

  setPreisFilter(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    this.preisFilter.set(value);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    console.log((target as HTMLInputElement).checked);
    if (!(target as HTMLInputElement).checked) {
      const defaultRating = document.querySelector<HTMLInputElement>(
        '[name="defaultRatingFilter"]'
      );
      (defaultRating as HTMLInputElement).checked = true;
      this.preisFilter.set(undefined);
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
