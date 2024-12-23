import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your authentication service

   @Injectable({
     providedIn: 'root'
   })
   export class AuthGuard implements CanActivate {
     constructor(private authService: AuthService, private router: Router) {}
     canActivate(): boolean {
       if (this.authService.userData().rolle === 'admin' || this.authService.userData().rolle === 'user') {
         return true; // Allow access to the route
       } else {
         // Redirect to the login page
         this.router.navigate(['/registrierung']);
         return false;
       }
     }
   }