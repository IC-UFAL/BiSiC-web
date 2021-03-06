import { Component } from '@angular/core';
import { Donation } from '../shared/models/donation';
import { FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../shared/authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationService} from '../notifications/shared/notification.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent {
  donation: Donation;

  titleControl = new FormControl('', [Validators.required]);
  error = false;

  constructor(private authService: AuthenticationService,
              private notificationService: NotificationService,
              private http: HttpClient) {
    this.donation = new Donation();
    if (this.authService.isLogged()) {
      this.donation.id_user = this.authService.getLoggedUser().pk;
    }
  }

  send() {
    this.error = false;

    const headers: HttpHeaders = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    this.http.post('http://localhost:8000/api/donation/', this.donation, { headers: headers })
      .subscribe(() => {
        alert('Doação cadastrada com sucesso! O IC Agradece sua doação.');
        this.notificationService.notificationEmitter.emit(true);
      }, err => {
        console.log(err);
        this.error = true;
      });
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
