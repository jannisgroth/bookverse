import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Buch } from '../../shared/models/buch.model';


@Injectable()
export class ReadService {
  readonly restUrl: string = 'https://localhost:3000/rest';

  readonly buecher = signal<Buch[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<{ show: boolean, message: string }>({ show: false, message: '' });
  readonly errorBilder = signal<{ show: boolean, message: string }>({ show: false, message: '' });

  constructor(
    private readonly http: HttpClient,
    private readonly logger: NGXLogger
  ) { } // Dependency injection


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
        this.error.set({ show: true, message: 'Es konnten keine Buecher geladen werden!' })
        setTimeout(() => {
          this.error.set({ show: false, message: '' });
        }, 3000);
      },
    });
  }

  /**
   * Lädt die Bild-Dateien fuer die uebergebenen Bücher.
   * Wenn ein Buch kein Bild hat, wird die Variable buchOhneFile auf true gesetzt.
   * Wenn am Ende mindestens ein Buch kein Bild hat, wird eine Fehlermeldung angezeigt.
   * @param buecher Die Bücher, fuer die die Bild-Dateien geladen werden sollen.
   */
  async getBuecherMitFile(buecher: Buch[]) {
    const loadFiles = buecher.map(async (buch) => {
      const url = buch._links.self.href;
      const id = Number(url?.substring(url.lastIndexOf('/') + 1));

      const file = await this.getFile(id);
      if (file) {
        buch.file = URL.createObjectURL(file);
        this.logger.debug('Bild für Buch geladen:', buch.file);
      } else {
        buch.file = undefined;
      }

    });
    await Promise.all(loadFiles);

    const fileExist = buecher.some(buch => buch.file !== undefined);

    if (!fileExist) {
      this.errorBilder.set({ show: true, message: 'Es konnten keine Bilder geladen werden!' });
      setTimeout(() => {
        this.errorBilder.set({ show: false, message: '' });
      }, 3000);
    }

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
