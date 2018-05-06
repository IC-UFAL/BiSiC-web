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

  searchUser(term: string) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.get<User[]>('http://localhost:8000/api/user/?search=' + term, { headers: headers });
  }

  getUserFullName(user: User) {
    if (user === undefined) {
      return;
    }

    let fullName = user.first_name;
    if (user.last_name) {
      fullName += ' ' + user.last_name;
    }
    return fullName;
  }
}
