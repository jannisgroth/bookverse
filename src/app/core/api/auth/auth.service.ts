import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Token } from '@angular/compiler';

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

  private readonly tokenUrl = 'https://localhost:3000/auth/token';

  constructor(private http: HttpClient) { }

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
    console.log(loginDaten);
    this.http
      .post<{
        access_token: string;
        [key: string]: any;
      }>(this.tokenUrl, loginDaten)
      .subscribe({
        next: response => {
          console.log(response);
          this.token.set(response.access_token);
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
        },
        error: error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.zugriffAlert.set(false);
            setTimeout(() => {
              this.zugriffAlert.set(undefined);
            }, 4000);
          }
        },
      });
  }
}

// TODO -> Validierung wenn backend nicht läuft + Tokenablaufdatum (UI Anzeige)