import {
  Component,
  effect,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ReadService } from '../../core/api/http-read.service';
import { NGXLogger } from 'ngx-logger';
import { Buch } from '../../shared/models/buch.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-bibliothek',
  imports: [CardComponent, NgFor, NgIf, ModalComponent],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.css',
  providers: [ReadService],
})
export class BibliothekComponent implements OnInit {
  buecherSignal = signal<Buch[]>([]);
  selectedBuchSignal = signal<Buch | undefined>(undefined);
  loading = signal<boolean>(true);

  constructor(
    private readservice: ReadService,
    private logger: NGXLogger
  ) {
    effect(() => {
      // Wenn buecherSignal aktualisiert wird, triggern wir diesen Effekt
      const buecher = this.readservice.buecher();
      this.loading.set(false); // loading auf false um spinner zu entfernen
      this.buecherSignal.set(buecher); // buecher dem signal zuweisen
      this.logger.debug('Aktualisierte Bücherliste:', buecher);
    });
  }
  ngOnInit(): void {
    // API-Aufruf, um die Bücher zu laden
    this.readservice.getBuecher();
  }

  openModal(buch: Buch) {
    this.selectedBuchSignal.set(buch);
    const modal: HTMLDialogElement = document.querySelector('#modal')!;
    if (modal) modal.showModal();
  }
}
