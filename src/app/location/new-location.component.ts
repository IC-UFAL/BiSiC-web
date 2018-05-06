import { Component } from '@angular/core';

import {UserService} from '../shared/user.service';
import {User} from '../shared/models/user';
import {Location} from '../shared/models/location.model';
import {Book, NominalBook} from '../book/shared/book.model';
import {BookService} from '../book/shared/book.service';
import {LocationsService} from '../notifications/locations/locations.service';
import {Router} from '@angular/router';
import {NotificationService} from '../notifications/shared/notification.service';

@Component({
  selector: 'app-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent {
  location: Location = new Location();
  studentSearch: any;
  bookSearch: any;

  isVisible: string;
  isLoading: string;
  timeout: any;
  searchResponse = {};
  error: boolean;

  constructor(private userService: UserService,
              private bookService: BookService,
              private locationsService: LocationsService,
              private notificationService: NotificationService,
              private router: Router) { }

  onFocus(attr: string) {
    if (this.searchResponse[attr]) {
      this.isVisible = attr;
    }
  }

  onBlur(attr: string) {
    this.isVisible = undefined;
    this.isLoading = undefined;
  }

  onChange(attr: string, event: string) {
    if (this.timeout !== 'undefined') {
      clearInterval(this.timeout);
    }

    if (this.isVisible !== attr) {
      this.isVisible = attr;
    }
    if (this.isLoading !== attr) {
      this.isLoading = attr;
    }
    this.searchResponse[attr] = undefined;

    if (attr === 'student') {
      this.timeout = setTimeout(() => {
        this.userService.searchUser(event).subscribe((data: User[]) => {
          this.searchResponse[attr] = data;
          this.isLoading = undefined;
        });
      }, 3000);
    } else if (attr === 'nomBook') {
      this.timeout = setTimeout(() => {
        this.bookService.searchNominalBook(event).subscribe((data: NominalBook[]) => {
          this.searchResponse[attr] = data;
          this.isLoading = undefined;
        });
      }, 3000);
    }

  }

  selectStudent(student: User) {
    this.location.id_user = student.pk;
    this.studentSearch = student.email;
    this.isVisible = undefined;
  }

  selectBook(nomBook: NominalBook) {
    this.bookSearch = nomBook.title;
    this.isVisible = undefined;

    this.isLoading = 'book';
    this.bookService.getBooks(nomBook.cod).subscribe((data: Book[]) => {
      this.searchResponse['book'] = data.filter(book => book.available);
      this.isLoading = undefined;
    }, err => {
      console.log(err);
      this.isLoading = undefined;
    });
  }

  send() {
    this.error = false;

    this.locationsService.create(this.location).subscribe(() => {
      this.router.navigate(['/']);
      this.notificationService.notificationEmitter.emit(true);
    }, err => {
      this.error = true;
    });
  }

  getUserFullName(student: User) {
    return this.userService.getUserFullName(student);
  }
}
