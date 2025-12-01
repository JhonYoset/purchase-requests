import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DebugInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request:', req.method, req.url);
    return next.handle(req).pipe(
      tap(
        event => console.log('HTTP Response:', event),
        error => console.error('HTTP Error:', error)
      )
    );
  }
}