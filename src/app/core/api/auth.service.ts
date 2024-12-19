import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  zugriff = signal<boolean | undefined>(undefined);
  token = signal<string | undefined>(undefined);
  private readonly tokenUrl = 'https://localhost:3000/auth/token';

  constructor(private http: HttpClient) {}

  async getToken(loginDaten: { username: string; password: string }) {
    console.log(loginDaten);
    this.http.post<{ access_token: string; [key: string]: any }>(this.tokenUrl, loginDaten).subscribe({
      next: response => {
        this.token.set(response.access_token);
console.log(response)


        // this.fetchUserInfo(this.token()!);

        console.log(this.token())
        this.zugriff.set(true);
        setTimeout(() => {
          this.zugriff.set(undefined);
        }, 4000);
      },
      error: error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.zugriff.set(false);
          setTimeout(() => {
            this.zugriff.set(undefined);
          }, 4000);
        }
      },
    });
  }


//   async fetchUserInfo(token: string) {
//     const url = 'http://localhost:8880/realms/nest/protocol/openid-connect/userinfo';
//     const headers = { Authorization: `Bearer ${token}` };
//     console.log(headers);
  
//     this.http.get(url, { headers }).subscribe({
//       next: (userInfo: any) => {
//         console.log('User Info:', userInfo);
//         // Falls Rollen im Benutzerinfo enthalten sind
//         console.log(userInfo.roles || []);
//       },
//       error: (err) => {
//         console.error('Failed to fetch user info:', err);
//       },
//     });
//   }
  
}