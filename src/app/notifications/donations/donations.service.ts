import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Donation} from '../../shared/models/donation';
import {AuthenticationService} from '../../shared/authentication.service';

@Injectable()
export class DonationsService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }

  getAllDonations() {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.get<Donation[]>('http://localhost:8000/api/donation/', { headers: headers });
  }

  updateDonation(donation: Donation) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.put<Donation>('http://localhost:8000/api/donation/' + donation.id + '/', donation, { headers: headers });
  }
}
