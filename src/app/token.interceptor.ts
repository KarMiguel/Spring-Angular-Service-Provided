import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    const url = request.url;

    if (token  && !url.endsWith('/auth/login')) {
      request = request.clone({
        setHeaders:{
          Authorization: 'Bearer ' + token
        }
      })
    } 
    return next.handle(request);
  }
}
