import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private logger: NGXLogger) {}

  log(message: string, ...args: any[]) {
    this.logger.log('LoggerService ist aktiv und funktioniert!');
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }
}
