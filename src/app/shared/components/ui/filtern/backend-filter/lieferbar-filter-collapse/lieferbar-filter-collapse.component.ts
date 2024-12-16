import { Component, Injector, input, WritableSignal } from '@angular/core';
import { ReadService } from '../../../../../../core/api/http-read.service';
import { Buch } from '../../../../../models/buch.model';

@Component({
  selector: 'app-lieferbar-filter-collapse',
  imports: [],
  templateUrl: './lieferbar-filter-collapse.component.html',
  styleUrl: './lieferbar-filter-collapse.component.css',
})
export class LieferbarFilterCollapseComponent {
  readonly buecher = input.required<WritableSignal<Buch[]>>();
  private readService: ReadService;
  private lieferbarFilter;

  constructor(injector: Injector) {
    this.readService = injector.get(ReadService);
    this.lieferbarFilter = this.readService.lieferbarFilter;
  }

  lieferbarAendern() {
    const checked = (document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement)!.checked;
    this.lieferbarFilter.set(checked);
    this.readService.getBuecherMitBild(this.buecher());
  }

  uncheck(target: EventTarget) {
    const toggle = document.getElementById(
      'lieferbarCheckbox'
    ) as HTMLInputElement;
    toggle.checked = true;
    if (!(target as HTMLInputElement).checked) {
      this.lieferbarFilter.set(undefined);
      setTimeout(() => {
        this.readService.getBuecherMitBild(this.buecher());
      }, 200);
    }
  }
}
