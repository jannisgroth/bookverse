import { Component, Injector, WritableSignal, input } from '@angular/core';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-rating-filter-collapse',
  imports: [],
  templateUrl: './rating-filter-collapse.component.html',
  styleUrl: './rating-filter-collapse.component.css',
})
export class RatingFilterCollapseComponent {
  readonly ratingFilter = input.required<WritableSignal<number | undefined>>();
  readonly filter: FilternComponent;

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  RatingFilterSetter(target: EventTarget) {
    const value = (target as HTMLSelectElement).value;
    this.ratingFilter().set(+value);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const defaultRating = document.getElementById('rangeFilter');
      (defaultRating as HTMLInputElement).value = '1';
      this.ratingFilter().set(undefined);
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
