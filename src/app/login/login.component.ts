import { Component } from '@angular/core';
import {RegisterUser, User} from '../shared/models/user';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();
  registerUser: RegisterUser = new RegisterUser();
  hasLoginError: boolean;
  hasRegisterError: boolean;

  constructor(private router: Router,
              private authService: AuthenticationService) {
    this.hasLoginError = false;
  }

  signIn() {
    this.hasLoginError = false;

    this.authService.login(this.user).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
      } ,
      error => {
        this.hasLoginError = true;
      }
    );
  }

  signUp() {
    this.hasRegisterError = false;

    this.authService.register(this.registerUser).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
      } ,
      error => {
        this.hasRegisterError = true;
      }
    );
  }
}
