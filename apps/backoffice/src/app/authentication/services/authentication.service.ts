import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  AUTH_TOKEN_KEY,
  LOGIN_ERROR_CODES,
  UNSUCCESSFUL_LOGIN,
} from '../constants/auth.constants';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.http
      .post<{ accessToken: string }>('/api/login', { username, password })
      .pipe(
        catchError(this.handleLoginError.bind(this)),
        map<{ accessToken: string }, boolean>(
          this.setSessionIfSuccessfulLogin.bind(this)
        ),
        tap(this.navigateToDashboardIfSuccessfulLogin.bind(this))
      );
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(AUTH_TOKEN_KEY);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  setSessionIfSuccessfulLogin(result: { accessToken: string }): boolean {
    this.removeSession();
    if (result.accessToken) {
      this.setSession(result);
      return true;
    }
    return false;
  }

  private handleLoginError(error: any): Observable<{ accessToken: string }> {
    console.log(error);
    if (LOGIN_ERROR_CODES.has(error.status)) {
      return of(UNSUCCESSFUL_LOGIN);
    }
    throw error;
  }

  private navigateToDashboardIfSuccessfulLogin(
    isSuccessfulLogin: boolean
  ): void {
    if (isSuccessfulLogin) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  private removeSession(): void {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }

  private setSession(result: { accessToken: string }): void {
    sessionStorage.setItem(AUTH_TOKEN_KEY, result.accessToken);
  }
}
