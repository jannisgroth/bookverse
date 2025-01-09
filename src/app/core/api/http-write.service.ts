import { Injectable } from '@angular/core';
import { Buch } from '../../shared/models/buch.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { LoggerService } from '../logging/logger.service';

@Injectable({
  providedIn: 'root',
})
export class WriteService {
  private readonly restUrl: string = 'https://localhost:3000/rest';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private logger: LoggerService
  ) {}

  /**
   * Legt ein neues Buch an. Wenn upload.mitFile true ist,
   * wird ein File mit hochgeladen und dem Buch zugeordnet.
   * @param buch Das Buch, das angelegt werden soll.
   * @param upload Ein Objekt mit den Eigenschaften "mitFile" (true, wenn eine Datei hochgeladen werden soll) und "file" (die Datei, die hochgeladen werden soll).
   * @returns Ein Promise, das gelöst wird, wenn das Buch erfolgreich angelegt wurde.
   * @throws Wenn das Buch nicht angelegt werden konnte, wird ein Error geworfen.
   */
  async createBuch(
    buch: Omit<Buch, '_links' | 'file'>,
    upload: { mitFile: boolean; file: File | undefined }
  ) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(this.restUrl, buch, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.auth.token()}`,
          }),
          reportProgress: true,
          observe: 'response',
        })
        .subscribe({
          next: async response => {
            this.logger.info('Buch erfolgreich angelegt');

            if (upload.mitFile) {
              const location = response.headers.get('location')!;
              if (!location) {
                this.logger.error(
                  'File-upload konnte nicht durchgeführt werden'
                );
                reject();
                return;
              }
              const id = Number(location.split('/').pop()); // die Id aus dem Link ziehen
              await this.uploadFile(upload.file!, id);
              resolve();
            }
            resolve();
          },
          error: (err: HttpErrorResponse) => {
            // für invalide Daten
            if (err.status === 422) {
              reject(err.error.message);
              this.logger.error('Invalide Daten, Buch nicht angelegt');
              return;
            }
            this.logger.error('Fehler beim Anlegen des Buches', err);
            reject(`Fehler beim anlegen des Buches: ${err.error.message}`);
          },
        });
    });
  }

  /**
   * Lädt eine Datei auf den Server hoch und ordnet sie dem Buch mit der Id zu.
   * @param file Die Datei, die hochgeladen werden soll.
   * @param id Die Id des Buches, zu dem die Datei hochgeladen werden soll.
   * @returns Ein Promise, das gelöst wird, wenn die Datei erfolgreich hochgeladen wurde.
   * @throws Wenn die Datei nicht hochgeladen werden konnte, wird ein Error geworfen.
   */
  async uploadFile(file: File, id: number) {
    return new Promise<void>((resolve, reject) => {
      if (!(file instanceof File)) {
        this.logger.error('File konnte nicht erkannt werden');
        reject();
        return;
      }

      // Speichern des Files zur übergabe ans Backend.
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post(`${this.restUrl}/${id}`, formData, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${this.auth.token()}`,
          }),
          reportProgress: true,
          observe: 'response',
        })
        .subscribe({
          next: () => {
            this.logger.info('File erfolgreich zum Buch hochgeladen');
            resolve();
          },
          error: () => {
            this.logger.error('Fehler beim Hochladen der Datei');
            reject();
          },
        });
    });
  }
}
