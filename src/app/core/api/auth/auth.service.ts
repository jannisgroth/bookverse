import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { LoggerService } from '../../logging/logger.service';

interface JwtPayloadWithRole extends JwtPayload {
  email?: string;
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  zugriffAlert = signal<boolean | undefined>(undefined);
  token = signal<string | undefined>(undefined);
  tokenEncoded = signal<JwtPayloadWithRole | undefined>(undefined);
  userData = signal<{ email: string; rolle: string }>({ email: '', rolle: '' });
  loggedIn = signal<boolean>(false);

  private readonly authUrl = 'https://localhost:3000/auth';

  constructor(private http: HttpClient, private logger: LoggerService) {
    if (localStorage.getItem('refresh_token')) {
      this.getRefreshToken();
    }
  }

  /**
   * Liefert den Zugriff auf den Auth-Service.
   *
   * Verwendet den POST-Endpunkt /auth/token, um den Benutzer mit den
   * uebergebenen Anmeldedaten zu authentifizieren.
   *
   * Wenn die Authentifizierung erfolgreich ist, wird der Zugriff auf den
   * Auth-Service freigegeben und der aktuelle Benutzername und die
   * Rolleninformationen in den Signalen token und role abgelegt.
   *
   * Wenn die Authentifizierung fehlschlaegt, wird der Zugriff
   * verweigert und der Fehler in der Konsole protokolliert.
   *
   * @param loginDaten Die Anmeldedaten des Benutzers.
   * @returns Ein Promise, das den Zugriff auf den Auth-Service
   *          signalisiert.
   */
  async getToken(loginDaten: { username: string; password: string }) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post<{
          access_token: string;
          refresh_token: string;
        }>(`${this.authUrl}/token`, loginDaten)
        .subscribe({
          next: response => {
            this.token.set(response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            // https://www.npmjs.com/package/jwt-decode
            this.tokenEncoded.set(
              jwtDecode<JwtPayloadWithRole>(response.access_token)
            );

            this.userData.set({
              email: this.tokenEncoded()!.email!,
              rolle:
                this.tokenEncoded()!.resource_access?.['nest-client']!.roles[0]!,
            });

            //console.log(this.tokenEncoded(), this.role(), this.email());
            this.loggedIn.set(true);
            this.zugriffAlert.set(true);
            setTimeout(() => {
              this.zugriffAlert.set(undefined);
            }, 4000);
            this.startTokenTimer();
            resolve();
          },
          error: error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.zugriffAlert.set(false);
              setTimeout(() => {
                this.zugriffAlert.set(undefined);
              }, 4000);
            }
            reject();
          },
        });
    });
  }

  /**
   * Holt ein neues Access-Token mit einem Refresh-Token.
   * Wird aufgerufen, wenn ein Refresh-Token in LocalStorage vorhanden ist.
   * Wenn der Refresh-Token ungültig ist, wird der Benutzer ausgeloggt.
   */
  private async getRefreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token || refresh_token === null) {
      return;
    }

    this.http.post<{
      access_token: string;
      refresh_token: string;
    }>(`${this.authUrl}/refresh`, { refresh_token }).subscribe({
      next: (response) => {
        this.token.set(response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.tokenEncoded.set(
          jwtDecode<JwtPayloadWithRole>(response.access_token)
        );

        this.userData.set({
          email: this.tokenEncoded()!.email!,
          rolle:
            this.tokenEncoded()!.resource_access?.['nest-client']!.roles[0]!,
        });
        this.loggedIn.set(true);

        this.startTokenTimer();
      },
      error: () => {
        this.logger.error('Fehler beim Refreshen des Token');
        this.loggedIn.set(false);
        this.token.set(undefined);
        this.tokenEncoded.set(undefined);
        this.userData.set({ email: '', rolle: '' });
        localStorage.removeItem('refresh_token');
        return;
      }
    });
  }

  /**
   * Checkt, ob der Token erneuert werden muss.
   * Wenn der Token innerhalb der nächsten Minute abläuft, wird ein neuer Token angefordert.
   */
  private async checkToken() {
    if (this.tokenEncoded() === undefined) {
      return;
    }
    if (((this.tokenEncoded()!.exp! * 1000) - Date.now()) < 60000) {
      this.logger.info('Zeit des Tokens bald rum', this.tokenEncoded()?.exp);
      await this.getRefreshToken();
      console.log('neuen token geholt');
    } else {
      console.log('noch kein token nötig', (this.tokenEncoded()!.exp! * 1000) - Date.now());
    }
  }

  /**
   * Startet den Token-Timer, der alle 60 Sekunden prueft, ob der Token
   * erneuert werden muss. Wenn der Token erneuert werden muss, wird der
   * getRefreshToken()-Aufruf gestartet.
   */
  private startTokenTimer() {
    this.logger.info('Token Timer gestartet');
    setInterval(() => {
      this.logger.info('Token Timer ausgelöst');
      this.checkToken();
    }, 60000);
  }
}

// TODO -> Bei den Postrequest genau schauen bezüglich asyncronität einfacher schreiben