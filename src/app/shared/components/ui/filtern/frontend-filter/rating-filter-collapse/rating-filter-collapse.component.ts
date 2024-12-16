import { Component, WritableSignal, input } from '@angular/core';
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

  constructor() {
    this.filter = new FilternComponent();
  }

  RatingFilterSetter(rating: number) {
    this.ratingFilter().set(rating);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    console.log((target as HTMLInputElement).checked);
    if (!(target as HTMLInputElement).checked) {
      const defaultRating = document.querySelector<HTMLInputElement>(
        '[name="defaultRatingFilter"]'
      );
      (defaultRating as HTMLInputElement).checked = true;
      this.ratingFilter().set(undefined);
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
