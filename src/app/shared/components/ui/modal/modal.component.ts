import { Component, Input } from '@angular/core';
import { Buch } from '../../../models/buch.model';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [],
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
}
