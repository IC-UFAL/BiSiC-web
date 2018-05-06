import { Component } from '@angular/core';
import {NominalBook} from '../book/shared/book.model';
import {BookService} from '../book/shared/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  topBooks: NominalBook[] = [];
  isLoading = true;
  error = false;

  constructor(private bookService: BookService) {
    this.bookService.getTopNominalBooks().subscribe(data => {
      this.topBooks = data;
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
      this.error = true;
    });
  }
}
