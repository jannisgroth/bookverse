import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { ReadService } from '../../../../core/api/http-base.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [ReadService],
})
export class CardComponent {
  readonly #service: ReadService;
  constructor(service: ReadService) {
    this.#service = service;
  }

  @Input() imageSrc: string = '';

  getBuch() {
    return this.#service.get();
  }
}
