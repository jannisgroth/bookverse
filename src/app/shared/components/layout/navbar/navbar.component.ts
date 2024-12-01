import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterState,
} from '@angular/router';
import {
  CommonModule,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import { DrawerComponent } from '../../ui/drawer/drawer.component';
import { SuchleisteComponent } from '../../ui/suchleiste/suchleiste.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    DrawerComponent,
    RouterLink,
    RouterLinkActive,
    SuchleisteComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showSearchBar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSearchBar = this.router.url === '/bibliothek';
    });
  }
}
