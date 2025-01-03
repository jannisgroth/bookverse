import { Injectable, resolveForwardRef } from '@angular/core';
import { Buch } from '../../shared/models/buch.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  ) { }

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
          next: async (response) => {
            this.logger.debug('Buch erfolgreich angelegt:', response);

            if (upload.mitFile) {
              const location = response.headers.get('location')!;
              if (!location) {
                this.logger.error('Id konnte nicht aus dem Header gelesen werden');
                reject(new Error('Id konnte nicht aus dem Header gelesen werden'));
              }
              const id = Number(location.split('/').pop());
              await this.uploadFile(upload.file!, id);
              resolve();
            }
            resolve();
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 422) {
              reject(err.error.message);
            }
            this.logger.error('Fehler beim Anlegen des Buches', err);
            reject(`Fehler beim anlegen des Buches: ${err.error.message}`);
          },
        });
    })
  }

  async uploadFile(file: File, id: number) {
    return new Promise<void>((resolve, reject) => {
      if (!(file instanceof File)) {
        this.logger.error('File ist keine Datei');
        return reject(new Error('File ist keine Datei'));
      }

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
          next: (response) => {
            this.logger.debug('File erfolgreich hochgeladen:', response);
            resolve();
          },
          error: err => {
            this.logger.error('Fehler beim Hochladen der Datei:', err);
            reject();
          },
        })
    })

  }
}
