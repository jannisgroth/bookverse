import { Component } from '@angular/core';
import { ReadService } from '../../core/api/http-read.service';
import { LoginComponent } from '../../shared/components/ui/login/login.component';
import { ErrorAlertComponent } from '../../shared/components/ui/alerts/error-alert/error-alert.component';

@Component({
  selector: 'app-registrierung',
  imports: [LoginComponent],
  providers: [ReadService],
  templateUrl: './registrierung.component.html',
  styleUrl: './registrierung.component.css',
})
export class RegistrierungComponent {}
