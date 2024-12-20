import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() titel!: string;
  @Input() placeholder: string | undefined;
  @Input() iconPath!: string;
  @Input() type!: string;
  @Input() step: string | undefined;
}
