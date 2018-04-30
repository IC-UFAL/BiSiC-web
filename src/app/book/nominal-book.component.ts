import { Component } from '@angular/core';
import {NominalBook} from './shared/book.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './nominal-book.component.html',
  styleUrls: ['./nominal-book.component.scss']
})
export class NominalBookComponent {
  nominalBook: NominalBook;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {

    });
  }

}
