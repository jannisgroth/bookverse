import {
  Component,
  Injector,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ReadService } from '../../../../../../core/api/http-read.service';
import { Buch } from '../../../../../models/buch.model';
import { FilternComponent } from '../../filtern.component';

@Component({
  selector: 'app-lieferbar-filter-collapse',
  imports: [],
  templateUrl: './lieferbar-filter-collapse.component.html',
  styleUrl: './lieferbar-filter-collapse.component.css',
})
export class LieferbarFilterCollapseComponent {
  readonly lieferbarFilter = input(signal<boolean | undefined>(undefined));
  readonly filter: FilternComponent;

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  lieferbarAendern() {
    const checked = (document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement)!.checked;
    this.lieferbarFilter().set(checked);
    this.filter.frontendFilter();
  }

  uncheck(target: EventTarget) {
    const toggle = document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement;
    toggle.checked = true;
    if (!(target as HTMLInputElement).checked) {
      this.lieferbarFilter().set(undefined);
      setTimeout(() => {
        this.filter.frontendFilter();
      }, 200);
    }
  }
}
