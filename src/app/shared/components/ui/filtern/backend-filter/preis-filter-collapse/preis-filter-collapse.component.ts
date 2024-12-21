import {
  Component,
  ElementRef,
  Injector,
  InputSignal,
  ViewChild,
  WritableSignal,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-preis-filter-collapse',
  imports: [NgClass],
  templateUrl: './preis-filter-collapse.component.html',
  styleUrl: './preis-filter-collapse.component.css',
})
export class PreisFilterCollapseComponent {
  readonly preisFilter = input.required<WritableSignal<string | undefined>>();
  private debounceZeit: ReturnType<typeof setTimeout> | undefined;
  manuellerInputError: boolean = false;
  readonly MAX_VALUE = '250';
  get checked() {
    const checkbox = document.getElementById('preisFilterCheckbox')!;
    return (checkbox as HTMLInputElement).checked;
  }

  readonly filter: FilternComponent;
  tooltip: boolean = false;

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  setPreisFilter(target: EventTarget) {
    this.manuellerInputError = false;
    const value = (target as HTMLInputElement).value;
    this.preisFilter().set(
      value === this.MAX_VALUE ? undefined : (+value).toFixed(2)
    );

    clearTimeout(this.debounceZeit);
    this.debounceZeit = setTimeout(() => {
      this.filter.filter();
    }, 100);
  }

  manuellerInput(target: EventTarget) {
    this.manuellerInputError = false;
    let value = (target as HTMLInputElement).value
      .replace('€', '')
      .replace('+', '');
    if (!isNaN(+value) && +value >= 0) {
      this.preisFilter().set(+value >= +this.MAX_VALUE ? undefined : value);
      this.filter.filter();
    } else {
      this.manuellerInputError = true;
    }
  }

  uncheck() {
    if (!this.checked) {
      this.preisFilter().set(undefined);
      const preisSelector = document.getElementById('rangeInput');
      (preisSelector as HTMLSelectElement)!.value = this.MAX_VALUE;
      this.manuellerInputError = false;
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
