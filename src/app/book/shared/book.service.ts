import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NominalBook, Book} from './book.model';
import {AuthenticationService} from '../../shared/authentication.service';

@Injectable()
export class BookService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) { }

  createNominalBook(book: NominalBook) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.post( 'http://localhost:8000/api/nominal_book/', book,  {headers: headers});
  }

  getNominalBook(cod: number) {
    return this.httpClient.get<NominalBook>( 'http://localhost:8000/api/nominal_book/' + cod + '/');
  }

  updateNominalBook(book: NominalBook) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.put<NominalBook>( 'http://localhost:8000/api/nominal_book/' + book.cod + '/', book, {headers: headers});
  }

  searchNominalBook(term: string) {
    return this.httpClient.get<NominalBook[]>( 'http://localhost:8000/api/nominal_book/?search=' + term);
  }

  getNominalBookQuantity(cod: number) {
    return this.httpClient.get<number>( 'http://localhost:8000/api/available_book_quantity/' + cod + '/');
  }

  createBook(cod: number, codNominalBook: number) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.post( 'http://localhost:8000/api/book/', {cod: cod, cod_nominal_book: codNominalBook},
      {headers: headers});
  }

  getBooks(cod: number) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.get<Book[]>( 'http://localhost:8000/api/book/list/' + cod + '/', {headers: headers});
  }

  getBook(cod: string) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.get<Book>( 'http://localhost:8000/api/book/' + cod + '/', {headers: headers});
  }

  getTopNominalBooks() {
    return this.httpClient.get<NominalBook[]>( 'http://localhost:8000/api/nominal_book_top10/');
  }
}
