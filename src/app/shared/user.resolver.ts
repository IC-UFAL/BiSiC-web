import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from './models/user';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private authService: AuthenticationService) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return Observable.create( (observer: Observer<User>) => {

      this.authService.resolveUserByToken().subscribe((user: User) => {
        observer.next(user);
        observer.complete();
      });

    });
  }
}
