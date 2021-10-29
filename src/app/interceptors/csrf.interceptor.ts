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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /*
    This interceptor grabs the csrfToken from the cookie to include in the request.
    Default behaviour of Angular with absolute URLs is to leave out the X-CSRFTOKEN header
    */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headerName = 'X-CSRFTOKEN';

    if (this.cookieService.check('csrftoken')) {
      let csrf = this.cookieService.get('csrftoken');
      if (csrf && !request.headers.has(headerName)) {
        request = request.clone({headers : request.headers.set(headerName, csrf)});
      }
    }

    return next.handle(request);
  }
}
