import { Component } from '@angular/core';
import { CardComponent } from '../../core/components/card/card.component';

@Component({
  selector: 'app-bibliothek',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.css'
})
export class BibliothekComponent {

}
