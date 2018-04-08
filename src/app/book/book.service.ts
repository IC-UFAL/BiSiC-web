import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBooks() {
    const headers: HttpHeaders = new HttpHeaders();
    return this.httpClient.get( 'http://localhost:8000/books/' ,  {headers: headers});
  }

}
