import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../../ui/drawer/drawer.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, DrawerComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
