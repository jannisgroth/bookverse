import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buch } from '../../../models/buch.model';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() buch: Buch | undefined;
  @Input() ausgewähltesBuch: Buch | undefined;

  openModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }

  get berechneterRabatt(): number | undefined {
    if (!this.buch) return undefined;
    if (this.buch.rabatt === undefined) return undefined;

    const rabatt = Number(this.buch.rabatt) * 100; // Rabatt-string in eine Zahl konvertieren
    return Math.round(rabatt * 100) / 100; // Runden auf 2 Dezimalstellen
  }

  get berechneterPreis(): number | undefined {
    if (!this.buch) return undefined;

    const preis = Number(this.buch.preis); // Preis-string in eine Zahl konvertieren
    const rabatt = this.buch.rabatt ? Number(this.buch.rabatt) : 0; // Rabatt direkt aus der Buch-Entität holen

    const berechneterPreis = preis * (1 - rabatt); // Berechnung des Preises mit Rabatt
    return Math.round(berechneterPreis * 100) / 100; // Runden auf 2 Dezimalstellen
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) {
      return ''; // Falls kein Datum vorhanden ist, gibt die Methode einen leeren String zurück
    }

    // Falls es sich bereits um ein Date-Objekt handelt, in String umwandeln
    if (date instanceof Date) {
      date = date.toISOString().split('T')[0]; // Umwandlung in "YYYY-MM-DD" von z.B "2022-02-01T12:34:56.789Z"
    }

    // Falls es ein Datum im String-Format ist (z. B. '2022-02-01')
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  }

  generateStars(rating: number): boolean[] {
    const stars: boolean[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating); // true für ausgefüllte Sterne, false für leere z.B [true, true, true, false, false] für 3
    }
    return stars;
  }
}
