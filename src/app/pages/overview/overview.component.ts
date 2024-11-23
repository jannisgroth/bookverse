import { Component } from '@angular/core';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';

@Component({
  selector: 'app-overview',
  imports: [CarouselComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
