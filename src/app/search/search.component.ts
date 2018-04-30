import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NominalBook} from '../book/shared/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  searchResults: NominalBook[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.searchTerm = params['termo'];
    });
  }

  ngOnInit() {
  }

}
