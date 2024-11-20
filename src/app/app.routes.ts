import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { BibliothekComponent } from './pages/bibliothek/bibliothek.component';

export const routes: Routes = [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: OverviewComponent},
    {path: 'library', component: BibliothekComponent},
    {path: '**', redirectTo: 'overview'}
];
