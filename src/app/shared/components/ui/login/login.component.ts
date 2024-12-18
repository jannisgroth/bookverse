import { Component } from '@angular/core';
import { AuthService } from '../../../../core/api/auth.service';
import { getTestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  async onLogin() {
    await this.auth.getToken();
  }
}
