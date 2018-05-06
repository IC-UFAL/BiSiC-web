import { Component } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationService} from '../notifications/shared/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  searchTerm: string;
  hasNotification: boolean;

  constructor(private authService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private http: HttpClient) {
    this.checkNotifications();
    this.notificationService.notificationEmitter.subscribe(
      () => this.checkNotifications()
    );
  }

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

  checkNotifications() {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    this.http.get<boolean>( 'http://localhost:8000/api/has_notification/', {headers: headers})
      .subscribe(data => this.hasNotification = data);
  }
}
