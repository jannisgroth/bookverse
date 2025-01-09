import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../core/api/auth/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ErrorAlertComponent } from '../alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from '../alerts/success-alert/success-alert.component';
import { LoggerService } from '../../../../core/logging/logger.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass,
    ErrorAlertComponent,
    SuccessAlertComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected loginForm: FormGroup = new FormGroup({
    benutzername: new FormControl(undefined, Validators.required),
    passwort: new FormControl(undefined, Validators.required),
  });
  protected loading = signal<boolean>(false);

  constructor(
    private auth: AuthService,
    private logger: LoggerService
  ) { }

  /**
   * Führt den Anmeldevorgang aus, sobald die Formularvalidierung erfolgreich ist.
   * Setzt die Ladeanimation und führt den Anmeldevorgang mit den eingegebenen
   * Benutzerdaten durch. Löscht die Formulareingaben nach dem Anmeldevorgang.
   */
  async onLogin() {
    this.loading.set(true);

    if (this.loginForm.valid) {
      await this.auth
        .getToken({
          username: this.loginForm.get('benutzername')!.value,
          password: this.loginForm.get('passwort')!.value,
        })
        .finally(() => {
          this.loginForm.reset();
          this.loading.set(false);
        });
    }
  }

  /**
   * Loggt den Benutzer aus und setzt die Signals "loggedIn" und
   * "zugriffAlert" auf "false" und "undefined", respektive. Löscht den
   * Refresh-Token aus dem LocalStorage und löscht die Signals "token" und
   * "userData".
   */
  async onLogout() {
    this.auth.loggedIn.set(false);
    this.auth.zugriffAlert.set({ show: undefined, message: '' });
    this.auth.userData.set({ email: '', rolle: '' });
    this.auth.token.set(undefined);
    localStorage.removeItem('refresh_token');
  }

  /**
   * Liefert den Wert der Eingabekomponente "Benutzername".
   * @returns Das Form-Control mit dem Benutzernamen.
   */
  get benutzername() {
    return this.loginForm.get('benutzername')!;
  }

  /**
   * Liefert den Wert der Eingabekomponente "Passwort".
   * @returns Das Form-Control mit dem Passwort.
   */
  get passwort() {
    return this.loginForm.get('passwort')!;
  }

  /**
   * Gibt den Wert von zugriffAlert zurück.
   * @returns undefined | false | true
   */
  get zugriffAlert() {
    return this.auth.zugriffAlert();
  }

  /**
   * Liefert die Daten des angemeldeten Benutzers.
   * @returns Das Signal mit den Benutzerdaten.
   */
  get userData() {
    return this.auth.userData();
  }

  /**
   * Liefert den Wert des Signals loggedIn.
   * @returns true, wenn ein Benutzer angemeldet ist, false sonst.
   */
  get loggedIn() {
    return this.auth.loggedIn();
  }
}
