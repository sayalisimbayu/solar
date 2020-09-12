import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authsrv: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      let cloned
      if(req.url.includes('mapquestapi') ) {
        cloned = req.clone({
          url: req.url,
          headers: req.headers.delete('Referer')
        });
      } else {
        cloned = req.clone({
          url: environment.serverUrl + '/api/' + req.url,
          headers: req.headers.set('Authorization', 'Bearer ' + idToken)
        });
      }


      return next.handle(cloned).pipe(
        tap(
          event => {
            if (
              event instanceof HttpResponse &&
              !event.url.endsWith('/authentication/page-login') &&
              !event.url.endsWith('/auth/refresh')
            ) {
              const refToken = this.authsrv.refreshToken();
              if (refToken !== null) {
                refToken.subscribe();
              }
            }
          },
          error => {
            console.error('NICE ERROR', error);
          }
        )
      );
    } else {
      let cloned
      if(req.url.includes('mapquestapi') ) {
        cloned = req.clone({
          url: req.url
        });
      } else {
        cloned = req.clone({
          url: environment.serverUrl + '/api/' + req.url
        });
      }
      return next.handle(cloned);
    }
  }
}
