import { Component, signal, WritableSignal, input } from '@angular/core';
import { LoggerService } from '../../../../../core/logging/logger.service';
import { Buch } from '../../../../models/buch.model';
import { SortierenComponent } from '../sortieren.component';

@Component({
  selector: 'app-sortier-dropdown',
  imports: [],
  templateUrl: './sortier-dropdown.component.html',
  styleUrl: './sortier-dropdown.component.css',
})
export class SortierDropdownComponent {
  readonly sortierkriterium =
    input.required<
      WritableSignal<
        keyof Omit<
          Buch,
          'art' | 'lieferbar' | 'homepage' | 'schlagwoerter' | '_links' | 'file'
        >
      >
    >();

  readonly sortierkriterien = [
    'isbn',
    'rating',
    'preis',
    'rabatt',
    'datum',
    'titel',
  ];

  constructor(
    private logger: LoggerService,
    private sortierservice: SortierenComponent
  ) {}

  /**
   * Setzt das Sortierkriterium und ruft die Funktion zum Updaten der Bücherliste auf.
   * @param target EventTarget vom Drop Down Menü, mit welchem man das
   * Sortierkriterium auswählt.
   * Mögliche Sortierkriterien: isbn, rating, preis, rabatt, datum, titel
   */
  buecherSortierung(target: EventTarget) {
    const sortierkriterium = (target as HTMLSelectElement).value;
    if (!this.sortierkriterien.includes(sortierkriterium)) {
      this.logger.error(`Ungültiges Sortierkriterium: ${sortierkriterium}`);
      return;
    }
    this.sortierkriterium().set(
      sortierkriterium as unknown as ReturnType<
        typeof this.sortierkriterium.arguments
      >
    );
    this.sortierservice.buecherUpdate();
  }
}
