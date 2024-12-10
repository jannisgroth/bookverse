import { Component, Input, WritableSignal } from '@angular/core';
import { SortierServiceComponent } from '../sortier-service/sortier-service.component';

@Component({
  selector: 'app-sortier-toggle',
  imports: [],
  templateUrl: './sortier-toggle.component.html',
  styleUrl: './sortier-toggle.component.css',
})
export class SortierToggleComponent {
  @Input() rangfolge!: WritableSignal<'aufsteigend' | 'absteigend'>;

  /**
   * Erzeugt eine neue SortierToggleComponent
   * @param sortierservice Der Sortierservice
   */
  constructor(private sortierservice: SortierServiceComponent) {}

  /**
   * Wechselt die Reihenfolge der (sortierten) Bücherliste zu auf/absteigend
   * ruft die Funktion buecherUpdate() auf
   */
  buecherRangfolge() {
    this.rangfolge.set(
      this.rangfolge() === 'aufsteigend' ? 'absteigend' : 'aufsteigend'
    );
    this.sortierservice.buecherUpdate();
  }
}
