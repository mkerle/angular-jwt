/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { CSRFInterceptor } from './csrf.interceptor';
import { CredentialsInterceptor } from './credentials.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }
	
];