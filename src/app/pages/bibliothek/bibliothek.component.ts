import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ReadService } from '../../core/api/http-read.service';
import { Buch } from '../../shared/models/buch.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ErrorAlertComponent } from '../../shared/components/ui/alerts/error-alert/error-alert.component';
import { LoggerService } from '../../core/logging/logger.service';
import { SortierenComponent } from '../../shared/components/ui/sortieren/sortieren.component';
import { FilternComponent } from '../../shared/components/ui/filtern/filtern.component';
import { SuchleisteComponent } from '../../shared/components/ui/suchleiste/suchleiste.component';

@Component({
  standalone: true,
  selector: 'app-bibliothek',
  imports: [
    CardComponent,
    NgFor,
    NgIf,
    ModalComponent,
    ErrorAlertComponent,
    SortierenComponent,
    FilternComponent,
    SuchleisteComponent,
  ],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.css',
  providers: [ReadService],
})
export class BibliothekComponent implements OnInit {
  readonly selectedBuchSignal = signal<Buch | undefined>(undefined);
  readonly buecher = signal<Buch[]>([]);

  /**
   * Erzeugt ein neues BibliothekComponent
   * @param readService Der Service, der die API-Aufrufe durchführt
   * @param logger Der Logger, der zum Protokollieren von Ereignissen verwendet wird
   */
  constructor(
    private readService: ReadService,
    private logger: LoggerService
  ) {
    readService.getBuecherMitBild(this.buecher);
  }

  get loading() {
    return this.readService.loading;
  }
  get errorShow() {
    return this.readService.error().show;
  }
  get errorMessage() {
    return this.readService.error().message;
  }

  /**
   * Lifecycle-Hook, der aufgerufen wird, wenn die Komponente initialisiert wurde.
   * Löst den API-Aufruf aus, um die Bücher zu laden.
   */
  ngOnInit(): void {
    // API-Aufruf, um die Bücher zu laden
    this.readService.getBuecherMitBild(this.buecher);
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
