import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buch } from '../../../models/buch.model';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() buch: Buch | undefined;
  @Output() openModal = new EventEmitter<any>();

  constructor(private location: Location) {}

  showDetails() {
    this.openModal.emit(this.buch);
  }
}
