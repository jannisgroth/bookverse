import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected token = signal('');
  private readonly tokenUrl = 'https://localhost:3000/auth/token';

  constructor(private http: HttpClient) {}

  async getToken(loginDaten: { username: string; password: string }) {
    console.log(loginDaten);
    this.http.post<{ access_token: string; [key: string]: any }>(this.tokenUrl, loginDaten).subscribe({
      next: response => {
        console.log(response);
        this.token.set(response.access_token);
        console.log(this.token());
      },
      error: error => {
        console.log(error);
        alert('Login Fehlgeschlagen!');
      },
    });
  }
}
