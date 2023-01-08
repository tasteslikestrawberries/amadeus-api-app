import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // route to get access token shouldn't have the access token added to the headers
    if (request.url.includes('oauth2/token')) {
      return next.handle(request);
    }

    request = this.addTokenToRequest(request);

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.refreshToken().pipe(
            switchMap(({ access_token, expires_in }) => {
              this.authService.setToken(access_token);
              request = this.addTokenToRequest(request);
              return next.handle(request);
            })
          );
        }

        throw err;
      })
    );
  }

  refreshToken() {
    return this.http.post<any>(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        client_id: environment.CLIENT_ID,
        client_secret: environment.CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  addTokenToRequest(request: HttpRequest<unknown>) {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }

    return request;
  }
}
