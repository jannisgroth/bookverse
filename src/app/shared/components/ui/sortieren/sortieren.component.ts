import { Component, signal, WritableSignal, input } from '@angular/core';
import { Buch } from '../../../models/buch.model';
import { LoggerService } from '../../../../core/logging/logger.service';
import { SortierDropdownComponent } from './sortier-dropdown/sortier-dropdown.component';
import { SortierToggleComponent } from './sortier-toggle/sortier-toggle.component';

@Component({
  selector: 'app-sortieren',
  imports: [SortierDropdownComponent, SortierToggleComponent],
  templateUrl: './sortieren.component.html',
  styleUrl: './sortieren.component.css',
})
export class SortierenComponent {
  readonly buecher = input.required<WritableSignal<Buch[]>>();

  /**
   * Erzeugt eine neue SortierServiceComponent
   * @param logger Der Logger, der zum Protokollieren von Ereignissen verwendet wird
   */
  constructor(private logger: LoggerService) {}

  sortierkriterium =
    signal<
      keyof Omit<
        Buch,
        'art' | 'lieferbar' | 'homepage' | 'schlagwoerter' | '_links' | 'file'
      >
    >('titel');
  rangfolge = signal<'Aufsteigend' | 'Absteigend'>('Aufsteigend');

  /**
   * Aktualisiert die Bücherliste nach den Sortierkriterien.
   * Mögliche Sortierkriterien: isbn, rating, preis, rabatt, datum, titel
   */
  buecherUpdate() {
    this.logger.info(
      `Sortierung mit Sortierkriterium: ${this.sortierkriterium()} und Rangfolge: ${this.rangfolge()}`
    );
    this.buecher().update(buecher => {
      // Spread Operator (...) ab ES2015
      return [...buecher].sort((erstesBuch, zweitesBuch) => {
        const erstesBuchWert =
          this.sortierkriterium() === 'titel'
            ? erstesBuch.titel?.titel
            : erstesBuch[this.sortierkriterium()];

        const zweitesBuchWert =
          this.sortierkriterium() === 'titel'
            ? zweitesBuch.titel?.titel
            : zweitesBuch[this.sortierkriterium()];

        const vergleichswert = (() => {
          switch (typeof erstesBuchWert) {
            case 'string':
              // Vergleich für Strings
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

        return this.rangfolge() === 'Aufsteigend'
          ? vergleichswert
          : -vergleichswert;
      });
    });
  }
}
