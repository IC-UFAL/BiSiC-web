import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(User) {
    const headers: HttpHeaders = new HttpHeaders();
    return this.httpClient.post( 'http://localhost:8000/auth-jwt/' , User , {headers: headers});
  }

  verify() {
    const headers: HttpHeaders = new HttpHeaders();
    const token = { 'token' : this.getToken() };
    return this.httpClient.post( 'http://localhost:8000/auth-jwt-verify/' , token , {headers: headers} );
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
