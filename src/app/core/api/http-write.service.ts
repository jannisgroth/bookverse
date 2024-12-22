import { Injectable } from '@angular/core';
import { Buch } from '../../shared/models/buch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WriteService {
  private readonly restUrl: string = 'https://localhost:3000/rest';

  constructor(private http: HttpClient, private auth: AuthService) { }

  async createBuch(buch: Omit<Buch, '_links' | 'file'>) {
    console.log(this.auth.token());
    this.http.post(
      this.restUrl,
      buch,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.auth.token()}`,
        }),
      }).subscribe({
        next: response => {
          alert('Buch wurde erfolgreich angelegt!');
        },
        error: err => {
          alert('fehler beim anlegen des buches');
          console.log(err);
        },
      });
  }
}
