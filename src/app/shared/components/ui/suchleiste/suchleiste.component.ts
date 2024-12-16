import { Component, EventEmitter, Output } from '@angular/core';
import { ReadService } from '../../../../core/api/http-read.service';
import { LoggerService } from '../../../../core/logging/logger.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suchleiste',
  imports: [FormsModule],
  templateUrl: './suchleiste.component.html',
  styleUrl: './suchleiste.component.css',
})
export class SuchleisteComponent {
  constructor(
    private readService: ReadService,
    private logger: LoggerService
  ) {}

  private debounceZeit: ReturnType<typeof setTimeout> | undefined;
  titelInput: string = '';
  onSubmit() {
    clearTimeout(this.debounceZeit);

    this.debounceZeit = setTimeout(() => {
      this.titelInput;
      this.readService.titelFilter.set(this.titelInput);

      this.readService.getBuecherMitBild();
      this.logger.debug(
        'buecher wurden mit Titel Filter geladen',
        this.readService.titelFilter()
      );
    }, 800);
  }
}
