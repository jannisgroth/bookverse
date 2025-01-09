import { Component, Injector, input, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-rabatt-filter-collapse',
  imports: [NgClass],
  templateUrl: './rabatt-filter-collapse.component.html',
})
export class RabattFilterCollapseComponent {
  readonly rabattFilter = input.required<WritableSignal<string | undefined>>();
  readonly filter: FilternComponent;
  private debounceZeit: ReturnType<typeof setTimeout> | undefined;
  manuellerInputError: boolean = false;
  get checked() {
    const checkbox = document.getElementById('rabattFilterCheckbox')!;
    return (checkbox as HTMLInputElement).checked;
  }

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  manuellerInput(target: EventTarget) {
    this.manuellerInputError = false;
    let value = (target as HTMLSelectElement).value.replace('%', '');
    if (!isNaN(+value) && 0 <= +value && +value <= 100) {
      value = (Number(value) / 100.0).toFixed(3);
      this.rabattFilter().set(value);
      this.filter.filter();
    } else {
      this.manuellerInputError = true;
    }
  }

  rabattFilterSetter(target: EventTarget) {
    this.manuellerInputError = false;
    const value = (target as HTMLSelectElement).value;
    this.rabattFilter().set(value);
    clearTimeout(this.debounceZeit);
    this.debounceZeit = setTimeout(() => {
      this.filter.filter();
    }, 100);
  }

  uncheck() {
    if (!this.checked) {
      const defaultRating = document.getElementById('rabattFilter');
      (defaultRating as HTMLInputElement).value = '0';
      this.manuellerInputError = false;
      this.rabattFilter().set(undefined);
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
