import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;
  private readonly tokenUrl = 'https://localhost:3000/auth/token';

  constructor(private http: HttpClient) {}

  async getToken() {
    const body = {
      username: 'admin',
      password: 'p',
    };
    this.http.post(this.tokenUrl, body).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
