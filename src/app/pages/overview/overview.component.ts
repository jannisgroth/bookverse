import { Component, Injectable, OnInit, signal } from '@angular/core';
import { ReadService } from '../../core/api/http-read.service';
import { LoginComponent } from '../../shared/components/ui/login/login.component';

@Component({
  selector: 'app-overview',
  imports: [LoginComponent],
  providers: [ReadService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {}
