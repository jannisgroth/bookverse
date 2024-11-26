import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Buch } from '../../shared/models/buch.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class ReadService {
  readonly restUrl: string = 'https://localhost:3000/rest';

  buecher = signal<Buch[]>([]);
  constructor(
    private readonly http: HttpClient,
    private readonly logger: NGXLogger
  ) {} // Dependency injection

  getBuecher() {
    this.http.get<{ _embedded: { buecher: Buch[] } }>(this.restUrl).subscribe({
      next: response => {
        const buecher = response._embedded.buecher;
        this.buecher.set(buecher);
        this.logger.debug('Bücher erfolgreich geladen:', buecher);
      },
      error: error => {
        this.logger.error('Fehler beim Abrufen der Bücher:', error);
        alert('Fehler beim Abrufen der Bücher');
        this.buecher.set([]); // Leere Liste im Fehlerfall
      },
    });
  }
}
