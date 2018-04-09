import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  user: User = new User();

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  signIn() {
    this.authenticationService.login(this.user).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/data']);
      } ,
      error => {
        this.router.navigate(['/home']);
      }
      );

  }

  singUp() {
    console.log('Chamou!');
  }

}
