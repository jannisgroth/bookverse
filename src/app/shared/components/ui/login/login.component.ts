import { ChangeDetectorRef, Component, signal, effect } from '@angular/core';
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
  styleUrl: './login.component.css',
})
export class LoginComponent {

  protected loginForm: FormGroup = new FormGroup({
    benutzername: new FormControl(undefined, Validators.required),
    passwort: new FormControl(undefined, Validators.required),
  });
  protected loading = signal<boolean>(false);

  private effect = effect(() => {
    this.logger.debug('Loading state geændert:', this.loading());
  })
  constructor(private auth: AuthService, private logger: LoggerService) { }

  /**
   * Login Funktion die, die Input-Daten an den Auth-Service weiterleitet.
   */
  async onLogin() {
    this.loading.set(true);
    console.log('1', this.loading());
    if (this.loginForm.valid) {
      await this.auth.getToken({
        username: this.loginForm.get('benutzername')!.value,
        password: this.loginForm.get('passwort')!.value,
      }).finally(() => {
        this.loginForm.reset();
        this.loading.set(false);
      });
    }
  }

  async onLogout() {
    this.auth.loggedIn.set(false);
    this.auth.zugriffAlert.set(undefined);
    this.auth.userData.set({ email: '', rolle: '' });
    this.auth.token.set(undefined);
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

  get zugriffAlert() {
    return this.auth.zugriffAlert();
  }

  get userData() {
    return this.auth.userData();
  }

  get loggedIn() {
    return this.auth.loggedIn();
  }
}
