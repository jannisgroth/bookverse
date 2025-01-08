import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  imports: [],
  templateUrl: './success-alert.component.html',
})
export class SuccessAlertComponent {
  message = input('');
  constructor() {}
}
