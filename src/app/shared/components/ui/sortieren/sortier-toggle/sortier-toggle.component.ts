import { Component, WritableSignal, input } from '@angular/core';
import { SortierenComponent } from '../sortieren.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sortier-toggle',
  imports: [CommonModule],
  templateUrl: './sortier-toggle.component.html',
})
export class SortierToggleComponent {
  readonly rangfolge =
    input.required<WritableSignal<'Aufsteigend' | 'Absteigend'>>();

  /**
   * Erzeugt eine neue SortierToggleComponent
   */
  constructor(private sortierservice: SortierenComponent) {}

  /**
   * Wechselt die Reihenfolge der (sortierten) Bücherliste zu auf/absteigend
   * ruft die Funktion buecherUpdate() im SortierService auf
   */
  buecherRangfolge() {
    this.rangfolge().set(
      this.rangfolge()() === 'Aufsteigend' ? 'Absteigend' : 'Aufsteigend'
    );
    this.sortierservice.buecherUpdate();
  }
}
