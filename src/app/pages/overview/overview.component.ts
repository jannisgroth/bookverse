import { Component, Injectable, signal } from '@angular/core';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';
import { ReadService } from '../../core/api/http-read.service';

@Component({
  selector: 'app-overview',
  imports: [CarouselComponent],
  providers: [ReadService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(private readservice: ReadService) { }

  get bucher() {
    return this.readservice.buecher();
  }
  ngOnInit() {
    this.readservice.getBuecherMitBild();
  }
}
