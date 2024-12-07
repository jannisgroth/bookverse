import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ReadService } from '../../core/api/http-read.service';
import { Buch } from '../../shared/models/buch.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ErrorAlertComponent } from '../../shared/components/ui/alerts/error-alert/error-alert.component';
import { LoggerService } from '../../core/logging/logger.service';

@Component({
  standalone: true,
  selector: 'app-bibliothek',
  imports: [CardComponent, NgFor, NgIf, ModalComponent, ErrorAlertComponent],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.css',
  providers: [ReadService],
})
export class BibliothekComponent implements OnInit {
  readonly selectedBuchSignal = signal<Buch | undefined>(undefined);

  sortierkriterium: keyof Buch = 'isbn';
  rangfolge: 'aufsteigend' | 'absteigend' = 'aufsteigend';

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

  /**
   * Sortiert die Bücherliste.
   * @param target EventTarget vom Drop Down Menü, mit welchem man das
   * Sortierkriterium auswählt
   * oder null, falls man nur auf/absteigend ändert.
   * Mögliche Sortierkriterien: isbn, rating, preis, rabatt, datum, titel
   */
  buecherSortierung(target: EventTarget | null) {
    const sortierkriterium =
      ((target as HTMLSelectElement)?.value as keyof Buch) ??
      this.sortierkriterium;
    if (
      !['isbn', 'rating', 'preis', 'rabatt', 'datum', 'titel'].includes(
        sortierkriterium
      )
    ) {
      this.logger.error('Ungültiges Sortierkriterium: {}', sortierkriterium);
      return;
    }
    this.sortierkriterium = sortierkriterium;

    this.logger.info(
      'Sortierung mit Sortierkriterium: {} und Rangfolge: {}',
      sortierkriterium,
      this.rangfolge
    );

    this.buecher.update(buecher => {
      return [...buecher].sort((a, b) => {
        const aWert =
          sortierkriterium === 'titel'
            ? a.titel?.titel
            : a[sortierkriterium as keyof Buch];
        const bWert =
          sortierkriterium === 'titel'
            ? b.titel?.titel
            : b[sortierkriterium as keyof Buch];
        let vergleichswert = 0;

        switch (typeof aWert) {
          case 'string':
            // Vergleich für Strings
            vergleichswert = (aWert as string).localeCompare(bWert as string);
            break;
          case 'number':
            // Vergleich für Zahlen
            vergleichswert = (aWert as number) - (bWert as number);
            break;
          default:
            // Für unbekannte Typen keine Sortierung
            vergleichswert = 0;
        }
        return this.rangfolge === 'aufsteigend'
          ? vergleichswert
          : -vergleichswert;
      });
    });
  }

  buecherRangfolge(): void {
    this.rangfolge =
      this.rangfolge === 'aufsteigend' ? 'absteigend' : 'aufsteigend';
    this.buecherSortierung(null);
  }
}
