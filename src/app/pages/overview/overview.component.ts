import { Component, Injectable, OnInit, signal } from '@angular/core';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';
import { ReadService } from '../../core/api/http-read.service';
import { ErrorAlertComponent } from '../../shared/components/ui/alerts/error-alert/error-alert.component';
import { NgIf } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-overview',
  imports: [CarouselComponent, ErrorAlertComponent, NgIf],
  providers: [ReadService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  constructor(
    private readservice: ReadService,
    private logger: NGXLogger
  ) { }
  get buecher() {
    return this.readservice.buecher;
  }
  get loading() {
    return this.readservice.loading;
  }
  get errorBilderShow() {
    return this.readservice.errorBilder().show;
  }
  get errorBilderMessage() {
    return this.readservice.errorBilder().message;
  }
  get errorShow() {
    return this.readservice.error().show;
  }
  get errorMessage() {
    return this.readservice.error().message;
  }

  ngOnInit() {
    this.readservice.getBuecherMitBild();
  }
}