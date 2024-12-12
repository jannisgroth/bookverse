import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ReadService } from '../../core/api/http-read.service';
import { Buch } from '../../shared/models/buch.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ErrorAlertComponent } from '../../shared/components/ui/alerts/error-alert/error-alert.component';
import { LoggerService } from '../../core/logging/logger.service';
import { SortierServiceComponent } from '../../shared/components/ui/sortier-service/sortier-service.component';
import { FilternComponent } from '../../shared/components/ui/filtern/filtern.component';

@Component({
  standalone: true,
  selector: 'app-bibliothek',
  imports: [
    CardComponent,
    NgFor,
    NgIf,
    ModalComponent,
    ErrorAlertComponent,
    SortierServiceComponent,
    FilternComponent,
  ],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.css',
  providers: [ReadService],
})
export class BibliothekComponent implements OnInit {
  readonly selectedBuchSignal = signal<Buch | undefined>(undefined);

  /**
   * Erzeugt ein neues BibliothekComponent
   * @param readservice Der Service, der die API-Aufrufe durchführt
   * @param logger Der Logger, der zum Protokollieren von Ereignissen verwendet wird
   */
  constructor(
    private readservice: ReadService,
    private logger: LoggerService
  ) {}
  get buecher() {
    return this.readservice.buecher;
  }
  get loading() {
    return this.readservice.loading;
  }
  get errorShow() {
    return this.readservice.error().show;
  }
  get errorMessage() {
    return this.readservice.error().message;
  }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Löst den API-Aufruf aus, um die Bücher zu laden.
   */
  ngOnInit(): void {
    // API-Aufruf, um die Bücher zu laden
    this.readservice.getBuecherMitBild();
  }
  /**
   * Zeigt das Modal an, indem es den selectedBuchSignal mit dem uebergebenen Buch setzt
   * und das Modal mit dem id "modal" zeigt.
   * @param buch Das Buch, das angezeigt werden soll
   */
  openModal(buch: Buch) {
    this.selectedBuchSignal.set(buch);
    const modal: HTMLDialogElement = document.querySelector('#modal')!;
    if (modal) modal.showModal();
  }
}
