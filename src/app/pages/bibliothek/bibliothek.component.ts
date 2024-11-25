import { Component, OnInit, signal } from '@angular/core';
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
  ) {}
  ngOnInit() {
    this.readservice.getBuecher().subscribe({
      next: buecher => {
        this.buecherSignal.set(buecher);
        this.loading.set(false);
        this.logger.log('Bücher geladen:', buecher);
      },
      error: error => {
        this.logger.error('Fehler beim Laden der Bücher:', error);
      },
    });
  }

  openModal(buch: Buch) {
    this.selectedBuchSignal.set(buch);
    const modal: HTMLDialogElement = document.querySelector('#modal')!;
    if (modal) modal.showModal();
  }
}
