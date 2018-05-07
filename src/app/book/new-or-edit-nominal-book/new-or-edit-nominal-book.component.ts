import { Component } from '@angular/core';
import {NominalBook} from '../shared/book.model';
import {BookService} from '../shared/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-nominal-book',
  templateUrl: './new-or-edit-nominal-book.component.html',
  styleUrls: ['./new-or-edit-nominal-book.component.scss']
})
export class NewOrEditNominalBookComponent {

  action = 'Criar';
  editBook: NominalBook;
  hasError;
  isLoading = true;
  isEditting = false;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) {
    this.editBook = new NominalBook();

    this.route.params.subscribe(params => {
      this.hasError = {};

      if (params['cod'] !== undefined) {
        this.isLoading = true;
        this.isEditting = true;
        this.action = 'Editar';

        this.bookService.getNominalBook(+params['cod']).subscribe(book => {
          this.editBook = book;
          this.isLoading = false;
          this.hasError = false;
        }, err => {
          console.log(err);
          this.isLoading = false;
          this.hasError['cod'] = true;
        });
      } else {
        this.isLoading = false;
        this.isEditting = false;
        this.hasError = false;
      }
    });
  }

  save() {
    if (this.isEditting) {
      this.bookService.updateNominalBook(this.editBook)
        .subscribe((book: NominalBook) => {
          this.router.navigate(['/livro', book.cod]);
        }, err => {
          console.log(err);
          this.hasError = true;
        });
    } else {
      this.bookService.createNominalBook(this.editBook)
        .subscribe((book: NominalBook) => {
          this.router.navigate(['/livro', book.cod]);
        }, err => {
          console.log(err);
          this.hasError = true;
        });
    }
  }
}
