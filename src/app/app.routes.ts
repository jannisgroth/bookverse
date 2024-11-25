import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { BibliothekComponent } from './pages/bibliothek/bibliothek.component';
import { AnlegenComponent } from './pages/anlegen/anlegen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ueberblick', pathMatch: 'full' },
  { path: 'ueberblick', component: OverviewComponent },
  { path: 'bibliothek', component: BibliothekComponent },
  { path: 'anlegen', component: AnlegenComponent },
  { path: '**', redirectTo: 'ueberblick' },
];
