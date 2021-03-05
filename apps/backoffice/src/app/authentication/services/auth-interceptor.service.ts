import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AUTH_TOKEN_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

    if (req.url.includes('/api/login')) {
      return next.handle(req);
    }

    let intercepted = req;
    if (token) {
      intercepted = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(intercepted).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          const router = this.injector.get(Router);
          sessionStorage.removeItem(AUTH_TOKEN_KEY);
          router.navigate(['/login']);
        }
        return of(null);
      })
    );
  }
}
