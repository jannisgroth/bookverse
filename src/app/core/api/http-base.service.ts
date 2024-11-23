import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReadService {
  readonly #http: HttpClient;
  constructor(http: HttpClient) {
    this.#http = http;
  }

  async get() {
    this.#http.get<any>('https://localhost:3000/rest').subscribe(buch => {
      console.log(buch);
    });
  }
}
