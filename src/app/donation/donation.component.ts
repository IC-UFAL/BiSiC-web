import { Component } from '@angular/core';
import { Donation } from '../shared/models/donation';
import { FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent {
  donation: Donation;

  titleControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationService) {
    this.donation = new Donation();
  }

  send() {
    console.log('Doação enviada');
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
