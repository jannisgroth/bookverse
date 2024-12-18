import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../core/api/auth.service';
import { getTestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    benutzername: new FormControl(undefined, Validators.required),
    passwort: new FormControl(undefined, Validators.required),
  });

  constructor(private auth: AuthService) { }

  async onLogin() {
    if (this.loginForm.valid) {
      await this.auth.getToken({
        username: this.loginForm.get('benutzername')!.value,
        password: this.loginForm.get('passwort')!.value
      });
    }
  }
}
