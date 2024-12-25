import { Injectable } from '@angular/core';
import { Buch } from '../../shared/models/buch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { LoggerService } from '../logging/logger.service';
import { filter } from 'rxjs';

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

  async createBuch(buch: Omit<Buch, '_links' | 'file'>, upload: { mitFile: boolean, file: File | undefined }) {
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
            const id = Number(location.split('/').pop()!);

            this.logger.debug('Datei wird hochgeladen:', upload.file, upload.file!.name, upload.file?.size);
            await this.uploadFile(upload.file!, id);
          }
          //alert('Buch wurde erfolgreich angelegt!');
          this.logger.info('Buch wurde erfolgreich angelegt!');
        },
        error: err => {
          this.logger.error('Fehler beim Anlegen des Buches', err)
        },
      });
  }

  async uploadFile(file: File, id: number) {
    const formData = new FormData();
    if (!(file instanceof File)) {
      console.error("Die übergebene Datei ist nicht vom Typ 'File");
    }
    formData.append('file', file);
    this.http.post(`${this.restUrl}/${id}`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token()}`,
      }),
      reportProgress: true,
      observe: 'response',
    }).subscribe({
      next: (response) => {
        this.logger.debug('File erfolgreich hochgeladen:', response);
      },
      error: error => {
        this.logger.error('Fehler beim Hochladen der Datei:', error);
      },
    });
  }
}
