import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from './authentication/authentication.service';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class AuthGuard implements CanActivate {
  private check = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer: Observer<boolean>) => {
      this.authService.verify().subscribe(
        data => {
          console.log('Ok');
          console.log(data);
          observer.next(true);
          observer.complete();
        } ,
        error => {
          console.log('Erro');
          console.log(error);
          this.router.navigate(['']);
          observer.next(false);
          observer.complete();

        }
      );
    });
  }
}
