import { Component, Input, signal } from '@angular/core';
import { Buch } from '../../../models/buch.model';
import { ReadService } from '../../../../core/api/http-read.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-carousel',
  imports: [NgFor, NgIf],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() buecher: Buch[] = [];
}
