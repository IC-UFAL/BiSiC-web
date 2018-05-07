import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User, RegisterUser} from './models/user';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class AuthenticationService {
  user: User;
  permissions = ['DIACOM', 'STUDENT'];

  constructor(private httpClient: HttpClient,
              private permissionsService: NgxPermissionsService) { }

  login(user) {
    const headers: HttpHeaders = new HttpHeaders();
    const ret = this.httpClient.post( 'http://localhost:8000/api/rest-auth/login/', user, {headers: headers}).share();

    ret.subscribe((data: any) => {
      localStorage.setItem('token', data.token);

      localStorage.setItem('permission', this.getPermission(data.user));
      this.permissionsService.loadPermissions([this.getPermission(data.user)]);

      this.user = data.user;
    }, error => console.log(error));
    return ret;
  }

  register(registerUser: RegisterUser) {
    const headers: HttpHeaders = new HttpHeaders();
    const ret = this.httpClient.post( 'http://localhost:8000/api/rest-auth/registration/', registerUser, {headers: headers}).share();

    ret.subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this.user = data.user;

      localStorage.setItem('permission', this.getPermission(data.user));
      this.permissionsService.loadPermissions([this.getPermission(data.user)]);
    }, error => console.log(error));
    return ret;
  }

  logout() {
    const headers: HttpHeaders = new HttpHeaders();
    const ret = this.httpClient.post( 'http://localhost:8000/api/rest-auth/logout/', {headers: headers}).share();

    ret.subscribe(() => {
      this.user = undefined;
      localStorage.removeItem('token');
      localStorage.removeItem('permission');
      this.permissionsService.flushPermissions();
    }, error => console.log(error));
    return ret;
  }

  loginByToken() {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.getToken()});
    const ret = this.httpClient.get<User>( 'http://localhost:8000/api/rest-auth/user/', {headers: headers}).share();

    ret.subscribe((data: any) => {
      this.user = data;
      localStorage.setItem('permission', this.getPermission(data));
      this.permissionsService.loadPermissions([this.getPermission(data)]);
    }, error => console.log(error));
    return ret;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getPermission(user?: User) {
    let permission = localStorage.getItem('permission');

    if (user) {
      if (user.is_DIACOM) {
        permission = this.permissions[0];
      } else {
        permission = this.permissions[1];
      }
    }
    return permission;
  }

  getLoggedUser() {
    return this.user;
  }

  updateUser(user: User) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.getToken()});
    return this.httpClient.put( 'http://localhost:8000/api/rest-auth/user/', user, { headers: headers });
  }

  isLogged() {
    return this.user !== undefined;
  }

  resolveUserByToken() {
    if (localStorage.getItem('token') !== null) {
      return this.loginByToken();
    } else {
      return Observable.create((observer: Observer<User>) => {
        observer.next(undefined);
        observer.complete();
      });
    }
  }
}
