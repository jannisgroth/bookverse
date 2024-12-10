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

  readonly sortierkriterien = [
    'isbn',
    'rating',
    'preis',
    'rabatt',
    'datum',
    'titel',
  ];
  sortierkriterium: keyof Omit<
    Buch,
    'art' | 'lieferbar' | 'homepage' | 'schlagwoerter' | '_links' | 'file'
  > = 'titel';
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
   * Setzt das Sortierkriterium und ruft die Funktion zum Updaten der Bücherliste auf.
   * @param target EventTarget vom Drop Down Menü, mit welchem man das
   * Sortierkriterium auswählt.
   * Mögliche Sortierkriterien: isbn, rating, preis, rabatt, datum, titel
   */
  buecherSortierung(target: EventTarget) {
    const sortierkriterium = (target as HTMLSelectElement).value;
    if (!this.sortierkriterien.includes(sortierkriterium)) {
      this.logger.error('Ungültiges Sortierkriterium: {}', sortierkriterium);
      return;
    }
    this.sortierkriterium = sortierkriterium as typeof this.sortierkriterium;

    this.logger.info(
      'Sortierung mit Sortierkriterium: {} und Rangfolge: {}',
      sortierkriterium,
      this.rangfolge
    );
    this.buecherUpdate();
  }

  buecherUpdate() {
    this.buecher.update(buecher => {
      // Spread Operator (...) ab ES2015
      return [...buecher].sort((erstesBuch, zweitesBuch) => {
        const erstesBuchWert =
          this.sortierkriterium === 'titel'
            ? erstesBuch.titel?.titel
            : erstesBuch[this.sortierkriterium];

        const zweitesBuchWert =
          this.sortierkriterium === 'titel'
            ? zweitesBuch.titel?.titel
            : zweitesBuch[this.sortierkriterium];

        const vergleichswert = (() => {
          switch (typeof erstesBuchWert) {
            case 'string':
              // Vergleich für Strings
              // localCompare aus lib.es2020.string.d.ts
              return erstesBuchWert.localeCompare(
                zweitesBuchWert as typeof erstesBuchWert
              );
            case 'number':
              // Vergleich für Zahlen
              return (
                erstesBuchWert - (zweitesBuchWert as typeof erstesBuchWert)
              );
            default:
              // Für unbekannte Typen keine Sortierung
              return 0;
          }
        })();

        return this.rangfolge === 'aufsteigend'
          ? vergleichswert
          : -vergleichswert;
      });
    });
  }

  /**
   * Wechselt die Reihenfolge der (sortierten) Bücherliste zu auf/absteigend
   * ruft die Funktion buecherUpdate() auf
   */
  buecherRangfolge() {
    this.rangfolge =
      this.rangfolge === 'aufsteigend' ? 'absteigend' : 'aufsteigend';
    this.buecherUpdate();
  }
}
