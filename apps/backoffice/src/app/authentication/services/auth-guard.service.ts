import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {
    if (this.authenticationService.isLoggedOut()) {
      this.router.navigate(['/login']);
    }
    return this.authenticationService.isLoggedIn();
  }
}
