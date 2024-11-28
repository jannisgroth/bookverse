import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Buch } from '../../shared/models/buch.model';

@Injectable()
export class ReadService {
  readonly restUrl: string = 'https://localhost:3000/rest';

  readonly buecher = signal<Buch[]>([]);
  readonly loading = signal<boolean>(true);
  readonly showError = signal<boolean>(false);
  constructor(
    private readonly http: HttpClient,
    private readonly logger: NGXLogger
  ) { } // Dependency injection

  /**
   * Fetches a list of books from the REST API and updates the internal state.
   * On a successful response, it sets the fetched books and logs a debug message.
   * On an error, it logs the error, sets an empty book list, and displays an error message temporarily.
   */
  getBuecherMitBild() {
    this.http.get<{ _embedded: { buecher: Buch[] } }>(`${this.restUrl}`).subscribe({
      next: response => {
        const buecher = response._embedded.buecher;

        this.getBuecherMitFile(buecher);

        this.buecher.set(buecher);
        this.logger.debug('Bücher erfolgreich geladen:', buecher);
        this.loading.set(false);
      },
      error: error => {
        this.logger.error('Fehler beim Abrufen der Bücher:', error);
        //alert('keine Bücher gefunden!');
        this.buecher.set([]); // Leere Liste im Fehlerfall
        this.loading.set(false);
        this.showError.set(true);
        setTimeout(() => {
          this.showError.set(false);
        }, 3000);
      },
    });
  }

  async getBuecherMitFile(buecher: Buch[]) {
    const loadFiles = buecher.map(async (buch) => {
      const url = buch._links.self.href;
      const id = Number(url?.substring(url.lastIndexOf('/') + 1));

      const file = await this.getFile(id);
      if (file) {
        buch.file = URL.createObjectURL(file);
        this.logger.debug('Bild für Buch geladen:', buch.file);
      }
    });
    await Promise.all(loadFiles);
  }

  getFile(id: number): Promise<Blob | undefined> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.restUrl}/file/${id}`, { responseType: 'blob' }).subscribe({
        next: (blob: Blob) => resolve(blob),
        error: (error: HttpResponse<Buch>) => {
          if (error.status === 404) {
            this.logger.warn(`Es gibt kein Bild zu dieser id ${id}`);
            resolve(undefined);
          } else {
            this.logger.error('Fehler beim Abrufen der Buchdatei:', error);
            reject(error);
          }
        },
      });
    });
  }

}
