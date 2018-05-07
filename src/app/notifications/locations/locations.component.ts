import {Component, OnChanges} from '@angular/core';
import {LocationsService} from './locations.service';
import { Location} from '../../shared/models/location.model';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/models/user';
import {BookService} from '../../book/shared/book.service';
import {NominalBook} from '../../book/shared/book.model';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'notifications-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

  locations: Location[] = [];
  error: boolean[] = [];

  constructor(private locationsService: LocationsService,
              private userService: UserService,
              private bookService: BookService,
              private notificationService: NotificationService) {
    this.locationsService.getAllLocations().subscribe((data: Location[]) => {
      data = data.reverse();
      const currDate = this.formatDate(new Date());
      this.locations = data.filter(l => this.isLate(l, currDate))
                            .concat(data.filter(l => !l.closed && !this.isLate(l)))
                            .concat(data.filter(l => l.closed));

      this.locations.forEach((loc: Location, idx: number) => {
        this.bookService.getBook(loc.cod_book).subscribe(b => {
          this.bookService.getNominalBook(b.cod_nominal_book).subscribe(nb => this.locations[idx]['nomBook'] = nb);
        });
        this.userService.getUser(loc.id_user).subscribe(u => this.locations[idx]['user'] = u);
      });
    });
  }

  onChange(idx: number, loc: Location) {
    this.error[idx] = false;

    this.locationsService.updateLocation(loc)
      .subscribe(() => {
          this.notificationService.notificationEmitter.emit(true);
        },
        err => {
          console.log(err);
          this.error[idx] = true;
        });
  }

  getUserFullName(user: User) {
    return this.userService.getUserFullName(user);
  }

  isLate(loc: Location, currDate = this.formatDate(new Date())) {
    return loc.date_f < currDate && !loc.closed;
  }

  getLocationStatus(loc: Location) {
    if (this.isLate(loc)) {
      return 'Atrasada';
    }
    return loc.closed ? 'Fechada' : 'Em aberto';
  }

  formatDate(date) {
    let d = date,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  getBookTitle(nomBook: NominalBook) {
    return nomBook ? nomBook.title : '';
  }
}
