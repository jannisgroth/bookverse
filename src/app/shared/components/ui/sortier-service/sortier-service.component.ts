import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Buch } from '../../../models/buch.model';
import { LoggerService } from '../../../../core/logging/logger.service';
import { SortierDropdownComponent } from '../sortier-dropdown/sortier-dropdown.component';
import { SortierToggleComponent } from '../sortier-toggle/sortier-toggle.component';

@Component({
  selector: 'app-sortier-service',
  imports: [SortierDropdownComponent, SortierToggleComponent],
  templateUrl: './sortier-service.component.html',
  styleUrl: './sortier-service.component.css',
})
export class SortierServiceComponent {
  @Input() buecher!: WritableSignal<Buch[]>;

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
  rangfolge = signal<'aufsteigend' | 'absteigend'>('aufsteigend');

  /**
   * Aktualisiert die Bücherliste nach den Sortierkriterien.
   * Mögliche Sortierkriterien: isbn, rating, preis, rabatt, datum, titel
   */
  buecherUpdate() {
    this.buecher.update(buecher => {
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

        return this.rangfolge() === 'aufsteigend'
          ? vergleichswert
          : -vergleichswert;
      });
    });
  }
}
