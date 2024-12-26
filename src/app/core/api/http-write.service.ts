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
    return new Promise((resolve, reject) => {
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

              this.logger.debug(
                'Datei wird hochgeladen:',
                upload.file,
                upload.file!.name,
                upload.file?.size
              );
              resolve(await this.uploadFile(upload.file!, id));
            }
            resolve(response.body);
          },
          error: (err: HttpErrorResponse) => {
            this.logger.error('Fehler beim Anlegen des Buches', err);
            reject();
          },
        });
    })
  }

  async uploadFile(file: File, id: number) {
    return new Promise((resolve, reject) => {
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
            resolve(response.body);
          },
          error: err => {
            this.logger.error('Fehler beim Hochladen der Datei:', err);
            reject(err);
          },
        })
    })

  }
}
