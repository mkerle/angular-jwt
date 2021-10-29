import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  private csrfRequestURL = 'http://localhost:9000/auth/login/';

  getCSRF() {
    this.http.get(this.csrfRequestURL).subscribe();
  }

  constructor(private http : HttpClient) { }
}
