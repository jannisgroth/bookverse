import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Methode, die überprüft, ob der Benutzer Zugriff auf die Administration
   * hat.
   *
   * @returns true, wenn der Benutzer Zugriff hat, false sonst.
   */
  canActivate(): boolean {
    if (
      this.authService.userData().rolle === 'admin'
    ) {
      return true; // Zugriff erlaubt
    } else {
      this.router.navigate(['/registrierung']);
      return false; // Zugriff verweigert
    }
  }
}
