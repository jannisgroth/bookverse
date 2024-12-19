import { Component, Injector, input, WritableSignal } from '@angular/core';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-rabatt-filter-collapse',
  imports: [],
  templateUrl: './rabatt-filter-collapse.component.html',
  styleUrl: './rabatt-filter-collapse.component.css',
})
export class RabattFilterCollapseComponent {
  readonly rabattFilter = input.required<WritableSignal<string | undefined>>();
  readonly filter: FilternComponent;

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  RabattFilterSetter(target: EventTarget) {
    const value = (target as HTMLSelectElement).value;
    this.rabattFilter().set(value);
    this.filter.filter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      const defaultRating = document.getElementById('rabattFilter');
      (defaultRating as HTMLInputElement).value = '0';
      this.rabattFilter().set(undefined);
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
