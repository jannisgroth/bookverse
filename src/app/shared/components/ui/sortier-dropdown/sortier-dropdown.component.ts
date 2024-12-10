import { Component, Input, signal, WritableSignal } from '@angular/core';
import { LoggerService } from '../../../../core/logging/logger.service';
import { Buch } from '../../../models/buch.model';
import { SortierServiceComponent } from '../sortier-service/sortier-service.component';

@Component({
  selector: 'app-sortier-dropdown',
  imports: [],
  templateUrl: './sortier-dropdown.component.html',
  styleUrl: './sortier-dropdown.component.css',
})
export class SortierDropdownComponent {
  @Input() sortierkriterium!: WritableSignal<
    keyof Omit<
      Buch,
      'art' | 'lieferbar' | 'homepage' | 'schlagwoerter' | '_links' | 'file'
    >
  >;

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
    private sortierservice: SortierServiceComponent
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
    this.sortierkriterium.set(
      sortierkriterium as ReturnType<typeof this.sortierkriterium>
    );
    this.sortierservice.buecherUpdate();
  }
}
