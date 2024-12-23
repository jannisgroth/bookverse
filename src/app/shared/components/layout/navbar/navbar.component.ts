import { Component, signal } from '@angular/core';
import {
  NavigationEnd,
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
import { AuthService } from '../../../../core/api/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    DrawerComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showSearchBar = signal<boolean>(false);

  constructor(private router: Router, private auth :AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSearchBar.set(this.router.url === '/bibliothek');
      }
    });
  }

  get zugriff() {
    return this.auth.zugriff();
  }
  get userData() {
    return this.auth.userData();
  }
}
