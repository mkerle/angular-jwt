import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';
import { CsrfService } from './csrf.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:9000/auth/login/'

  login(credentials : Credentials) {

    const bodyParam = JSON.stringify(credentials);
		const options = { body : bodyParam };

    return this.http.request<any>('POST', this.authURL, options)
        .pipe(
          map(response => {
            
            if (response && response.token) {
              sessionStorage.setItem('token', response.token);
              return true;
            }
            return false;
          }), catchError(this.handleError<any>('login', []))
        );
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  jwtPublicKey() {
    return this.http.request<any>('GET', 'http://localhost:9000/auth/publickey/')
      .pipe(
        map(response => {
          if (response && response.publicKeyBytes) {
            return response.publicKeyBytes
          }
          return null
        }), catchError(this.handleError<any>('jwtPublicKey', []))
      );
  }

  isLoggedIn() : boolean {    
    let token = sessionStorage.getItem('token');

    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  get currentUser() {
    let token = sessionStorage.getItem('token');
    if (!token) { return null; }

    return this.jwtHelper.decodeToken(token);
  }

	/** Log a HeroService message with the MessageService */
	/*
  protected log(message: string) {
	  this.messageService.add(`FortiService: ${message}`);
	}
  */

  /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	protected handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	
	    // TODO: better job of transforming error for user consumption
	    //this.log(`${operation} failed: ${error.message}`);
	
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
  }

  constructor(private http: HttpClient, private jwtHelper : JwtHelperService, private csrfService : CsrfService) { csrfService.getCSRF(); }

}

type Credentials = {
  username: string,
  password: string
}
