import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NominalBook} from '../book/shared/book.model';
import {BookService} from '../book/shared/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoading = true;

  searchTerm: string;
  searchResults: NominalBook[] = [];

  constructor(private route: ActivatedRoute,
              private bookService: BookService) {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.searchTerm = params['termo'];

      this.bookService.searchNominalBook(this.searchTerm)
        .subscribe((data: NominalBook[]) => {
            this.searchResults = data;
            this.isLoading = false;
            },
           err => {
              console.log(err);
              this.isLoading = false;
            }
        );
    });
  }

  ngOnInit() {
  }

}
