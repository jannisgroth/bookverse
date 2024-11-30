import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-drawer',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  @Input() drawerId: string = 'default-drawer';
  @Input() iconTemplate!: TemplateRef<any>;
}