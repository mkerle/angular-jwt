import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // We only need to add JWt token if we are not requesting the csrf
    /*let jwtToken = sessionStorage.getItem('token');
    if (jwtToken) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', jwtToken)
      });

      return next.handle(authReq);
    }*/
    

    return next.handle(request);
  }
}
