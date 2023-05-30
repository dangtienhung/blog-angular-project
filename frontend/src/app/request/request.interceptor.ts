import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // generate global token when login
    const token = this.auth.getToken();
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          authorization: `Bearer ${token}`,
        }),
      });
    }
    return next.handle(request);
  }
}
