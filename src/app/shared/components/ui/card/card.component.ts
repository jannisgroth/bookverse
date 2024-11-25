import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buch } from '../../../models/buch.model';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() imageSrc: string = '';
  @Input() buch: any;
  @Output() openModal = new EventEmitter<any>();

  buecher = signal<Buch[]>([]);

  constructor() {}

  showDetails() {
    this.openModal.emit(this.buch);
  }
}
