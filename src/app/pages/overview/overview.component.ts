import { Component } from '@angular/core';
import { CarouselComponent } from '../../core/components/carousel/carousel.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
