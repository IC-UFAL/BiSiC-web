import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NominalBook} from './book.model';
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
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.get<NominalBook>( 'http://localhost:8000/api/nominal_book/' + cod + '/',  {headers: headers});
  }

  updateNominalBook(book: NominalBook) {
    const headers: HttpHeaders = new HttpHeaders({Authorization: 'Bearer ' + this.authService.getToken()});
    return this.httpClient.put<NominalBook>( 'http://localhost:8000/api/nominal_book/' + book.cod + '/', book, {headers: headers});
  }
}
