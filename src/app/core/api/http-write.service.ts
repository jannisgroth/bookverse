import { Injectable } from '@angular/core';
import { Buch } from '../../shared/models/buch.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WriteService {
  private readonly restUrl: string = 'https://localhost:3000/rest';

  constructor(private http: HttpClient) { }

  async createBuch(buch: Omit<Buch, '_links'>) {
    this.http.post(this.restUrl, buch).subscribe({
      next: response => {
        alert('Buch wurde erfolgreich angelegt!');
      },
      error: err => {
        alert('fehler beim anlegen des buches');
      },
    });
  }
}
