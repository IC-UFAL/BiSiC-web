import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '../../shared/models/location.model';
import {AuthenticationService} from '../../shared/authentication.service';

@Injectable()
export class LocationsService {

  constructor(private authService: AuthenticationService,
              private http: HttpClient) { }

  getAllLocations() {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.get<Location[]>('http://localhost:8000/api/location/', { headers: headers });
  }

  create(location: Location) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.http.post<Location>('http://localhost:8000/api/location/', location, { headers: headers });
  }
}
