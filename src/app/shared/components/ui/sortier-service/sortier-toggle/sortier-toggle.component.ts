import { Component, Input, WritableSignal } from '@angular/core';
import { SortierServiceComponent } from '../../sortier-service/sortier-service.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sortier-toggle',
  imports: [CommonModule],
  templateUrl: './sortier-toggle.component.html',
  styleUrl: './sortier-toggle.component.css',
})
export class SortierToggleComponent {
  @Input() rangfolge!: WritableSignal<'Aufsteigend' | 'Absteigend'>;

  /**
   * Erzeugt eine neue SortierToggleComponent
   */
  constructor(private sortierservice: SortierServiceComponent) {}

  /**
   * Wechselt die Reihenfolge der (sortierten) Bücherliste zu auf/absteigend
   * ruft die Funktion buecherUpdate() im SortierService auf
   */
  buecherRangfolge() {
    this.rangfolge.set(
      this.rangfolge() === 'Aufsteigend' ? 'Absteigend' : 'Aufsteigend'
    );
    this.sortierservice.buecherUpdate();
  }
}
