import { Component } from '@angular/core';
import {LocationsService} from './locations.service';
import { Location} from '../../shared/models/location.model';

@Component({
  selector: 'notifications-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

  locations: Location[] = [];

  constructor(private locationsService: LocationsService) {
    this.locationsService.getAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }

  isLate(loc: Location) {
    return false;
  }
}
