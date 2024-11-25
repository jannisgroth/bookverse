import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Buch } from '../../shared/models/buch.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class ReadService {
  readonly restUrl: string = 'https://localhost:3000/rest';
  constructor(
    private readonly http: HttpClient,
    private readonly logger: NGXLogger
  ) {} // Dependency injection

  getBuecher(): Observable<Buch[]> {
    return this.http.get<{ _embedded: { buecher: Buch[] } }>(this.restUrl).pipe(
      map(response => {
        return response._embedded.buecher.map(buch => ({
          isbn: buch.isbn,
          rating: buch.rating,
          art: buch.art,
          preis: buch.preis,
          rabatt: buch.rabatt,
          lieferbar: buch.lieferbar,
          datum: buch.datum,
          homepage: buch.homepage,
          schlagwoerter: buch.schlagwoerter,
          titel: buch.titel,
        }));
      }),
      catchError(error => {
        this.logger.error('Fehler beim Abrufen der Bücher:', error);
        alert('Fehler beim Abrufen der Bücher');
        return of([]);
      })
    );
  }
}
