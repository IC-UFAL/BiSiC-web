import { Component } from '@angular/core';
import {NominalBook} from './shared/book.model';
import {ActivatedRoute} from '@angular/router';
import {BookService} from './shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './nominal-book.component.html',
  styleUrls: ['./nominal-book.component.scss']
})
export class NominalBookComponent {
  nominalBook: NominalBook;
  loading = true;

  constructor(private route: ActivatedRoute,
              private bookService: BookService) {
    this.route.params.subscribe(params => {
      this.bookService.getNominalBook(+params['cod']).subscribe(book => {
        this.nominalBook = book;
        this.loading = false;
      }, err => {
        console.log(err);
        this.loading = false;
      });
    });
  }

}
