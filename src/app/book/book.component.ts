import { Component } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  constructor(private bookService: BookService) {
    console.log('Chamou');

    this.bookService.getBooks().subscribe(
      (data: any) => {
        console.log(data);
      } ,
      error => {
        alert('Erro em Data!');
        console.log(error);
      }
    );
  }

}
