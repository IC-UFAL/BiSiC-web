import { Component } from '@angular/core';

import {UserService} from '../shared/user.service';
import {User} from '../shared/models/user';
import {Location} from '../shared/models/location.model';
import {NominalBook} from '../book/shared/book.model';
import {BookService} from '../book/shared/book.service';
import {LocationsService} from '../notifications/locations/locations.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent {
  location = new Location();
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
    } else if (attr === 'book') {
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

  selectBook(book: NominalBook) {
    this.location.cod_book = book.cod;
    this.bookSearch = book.title;
    this.isVisible = undefined;
  }

  send() {
    console.log(this.location);
    this.error = false;

    this.locationsService.create(this.location).subscribe(() => {
      this.router.navigate(['/']);
    }, err => {
      this.error = true;
    });
  }
}
