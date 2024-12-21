import { Routes } from '@angular/router';
import { RegistrierungComponent } from './pages/registrierung/registrierung.component';
import { BibliothekComponent } from './pages/bibliothek/bibliothek.component';
import { BuchAnlegenComponent } from './pages/buchAnlegen/buchAnlegen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registrierung', pathMatch: 'full' },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: 'bibliothek', component: BibliothekComponent },
  { path: 'buchAnlegen', component: BuchAnlegenComponent },
  { path: '**', redirectTo: 'registrierung' },
];
