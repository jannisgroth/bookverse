import { Injectable, signal, effect, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Buch, BuchArt } from '../../shared/models/buch.model';
import { LoggerService } from '../logging/logger.service';

@Injectable()
export class ReadService {
  readonly restUrl: string = 'https://localhost:3000/rest';

  readonly loading = signal<boolean>(true);
  readonly error = signal<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });
  readonly errorBilder = signal<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  readonly artFilter = signal<BuchArt | undefined>(undefined);
  readonly lieferbarFilter = signal<boolean | undefined>(undefined);
  readonly titelFilter = signal<string | undefined>(undefined);
  readonly schlagwoerterFilter = signal<string[]>([]);
  readonly ratingFilter = signal<number | undefined>(undefined);
  readonly preisFilter = signal<string | undefined>(undefined);
  readonly rabattFilter = signal<string | undefined>(undefined);

  onSignalChange() {
    console.log('Signal wurde gesetzt!');
  }

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService
  ) {} // Dependency injection

  getBuecherMitBild(buecher: WritableSignal<Buch[]>) {
    //params enthält die Queryparameter aus den Signals
    const params = this.paramsBuilder();

    this.http
      .get<{ _embedded: { buecher: Buch[] } }>(`${this.restUrl}`, { params })
      .subscribe({
        next: response => {
          buecher.set(response._embedded.buecher);

          this.getBuecherMitFile(buecher);

          this.logger.debug('Bücher erfolgreich geladen:', buecher);
          this.loading.set(false);
        },
        error: error => {
          this.logger.error('Fehler beim Abrufen der Bücher:', error);
          //alert('keine Bücher gefunden!');
          buecher.set([]); // Leere Liste im Fehlerfall
          this.loading.set(false);
          this.error.set({
            show: true,
            message: 'Es konnten keine Buecher geladen werden!',
          });
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
  async getBuecherMitFile(buecher: WritableSignal<Buch[]>) {
    const loadFiles = buecher().map(async buch => {
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

    const fileExist = buecher().some(buch => buch.file !== undefined);

    if (!fileExist) {
      this.errorBilder.set({
        show: true,
        message: 'Es konnten keine Bilder geladen werden!',
      });
      setTimeout(() => {
        this.errorBilder.set({ show: false, message: '' });
      }, 3000);
    }
  }

  getFile(id: number): Promise<Blob | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.restUrl}/file/${id}`, { responseType: 'blob' })
        .subscribe({
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

  createBuch(buch: Buch) {
    this.http.post(this.restUrl, buch).subscribe({
      next: response => {
        alert('Buch wurde erfolgreich angelegt!');
      },
      error: err => {
        alert('fehler beim anlegen des buches');
      },
    });
  }

  private paramsBuilder(): HttpParams {
    let params = new HttpParams();
    if (this.artFilter()) params = params.append('art', this.artFilter()!);
    if (this.lieferbarFilter() !== undefined) {
      params = params.append('lieferbar', this.lieferbarFilter()!);
    }
    if (this.titelFilter())
      params = params.append('titel', this.titelFilter()!);
    if (this.schlagwoerterFilter())
      this.schlagwoerterFilter()!.forEach(schlagwort => {
        params = params.append(schlagwort, true);
      });
    if (this.preisFilter())
      params = params.append('preis', this.preisFilter()!);
    if (this.rabattFilter())
      params = params.append('rabatt', this.rabattFilter()!);
    if (this.ratingFilter())
      params = params.append('rating', this.ratingFilter()!);
    return params;
  }
}
