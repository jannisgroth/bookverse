import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  async get() {
    const buch = await this.http.get('https://localhost:3000/rest', {
      headers: { 'Content-Type': 'application/hal+json' },
    });
    return JSON.stringify(buch);
  }
}
