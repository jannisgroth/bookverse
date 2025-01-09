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
})
export class LieferbarFilterCollapseComponent {
  readonly lieferbarFilter = input(signal<boolean | undefined>(undefined));
  readonly filter: FilternComponent;
  get checked() {
    const checkbox = document.getElementById('lieferbarFilterCheckbox')!;
    return (checkbox as HTMLInputElement).checked;
  }

  constructor(injector: Injector) {
    this.filter = injector.get(FilternComponent);
  }

  lieferbarAendern() {
    const checked = (document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement)!.checked;
    this.lieferbarFilter().set(checked);
    this.filter.filter();
  }

  uncheck() {
    const toggle = document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement;
    toggle.checked = true;
    if (!this.checked) {
      this.lieferbarFilter().set(undefined);
      setTimeout(() => {
        this.filter.filter();
      }, 200);
    }
  }
}
