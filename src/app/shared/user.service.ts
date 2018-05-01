import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {User} from './models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }

  getUser(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.get<User>('http://localhost:8000/api/user/' + id + '/', { headers: headers });
  }
}
