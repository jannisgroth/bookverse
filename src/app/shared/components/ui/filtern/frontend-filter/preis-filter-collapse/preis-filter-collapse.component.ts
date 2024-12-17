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
    console.log(`Value: ${value}`);
    this.preisFilter.set(value);
    console.log(`Signal in Preiskomponente: ${this.preisFilter()}`);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    if (!(target as HTMLInputElement).checked) {
      this.preisFilter.set(undefined);
      const preisSelector = document.getElementById('rangeInput');
      (preisSelector as HTMLSelectElement)!.value = '100';
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
