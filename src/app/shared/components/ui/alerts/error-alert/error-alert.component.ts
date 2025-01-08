import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  imports: [],
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  message = input('');
  constructor() {}
}
