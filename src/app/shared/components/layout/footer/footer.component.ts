import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ErrorAlertComponent } from '../../ui/alerts/error-alert/error-alert.component';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, ErrorAlertComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  showalert = signal<boolean>(false)
  subscribe(email: string) {
    if (email) {
      alert(`Sie haben unseren Newsletter erfolgreich abonniert mit der E-Mail-Adresse: ${email}`);
    } else {
      this.showalert.set(true);
      setTimeout(() => this.showalert.set(false), 3000);
    }

  }
}
