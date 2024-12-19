import {
  Component,
  ElementRef,
  Injector,
  Input,
  InputSignal,
  ViewChild,
  WritableSignal,
  input,
} from '@angular/core';
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

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  setPreisFilter(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    this.preisFilter.set(value);
    this.filter.filter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      this.preisFilter.set(undefined);
      const preisSelector = document.getElementById('rangeInput');
      (preisSelector as HTMLSelectElement)!.value = '100';
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
