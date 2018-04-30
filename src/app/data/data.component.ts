import { Component } from '@angular/core';
import {User} from '../shared/models/user';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  user: User;
  picture: string;

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getLoggedUser();
    this.picture = this.user.profile_pic;
  }

  save() {
    this.authService.updateUser(this.user).subscribe((data: User) => {
        this.picture = data.profile_pic;
      },
        err => console.log(err)
    );
  }
}
