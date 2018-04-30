import { Component } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  searchTerm: string;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  isLogged() {
    return this.authService.isLogged();
  }

  onSearch(event?) {
    if (event !== undefined) {
      if (event.key !== 'Enter') {
        return;
      }
    }

    if (this.searchTerm && this.searchTerm.length > 0) {
      this.router.navigate(['/buscar', this.searchTerm]);
    }
  }
}
