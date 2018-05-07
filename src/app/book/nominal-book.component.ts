import {Component, Inject} from '@angular/core';
import {NominalBook} from './shared/book.model';
import {ActivatedRoute} from '@angular/router';
import {BookService} from './shared/book.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-book',
  templateUrl: './nominal-book.component.html',
  styleUrls: ['./nominal-book.component.scss']
})
export class NominalBookComponent {
  nominalBook: NominalBook;
  isLoading = true;
  loadingAvailability: boolean;
  available: boolean;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.bookService.getNominalBook(+params['cod']).subscribe(book => {
        this.nominalBook = book;
        this.isLoading = false;

        this.checkAvailability();
      }, err => {
        console.log(err);
        this.isLoading = false;
      });
    });
  }

  openNewInstanceDialog() {
    const dialogRef = this.dialog.open(NewBookInstanceDialog, {
      width: '250px',
      data: { title: this.nominalBook.title, codNominalBook: this.nominalBook.cod }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkAvailability();
      }
    });
  }

  private checkAvailability() {
    this.loadingAvailability = true;
    return this.bookService.getNominalBookQuantity(this.nominalBook.cod).subscribe(qnt => {
      this.loadingAvailability = false;
      this.available = qnt > 0;
    });
  }
}

@Component({
  selector: 'app-new-book-instance-dialog',
  templateUrl: 'new-book-instance-dialog.html',
})
export class NewBookInstanceDialog {
  code: number;
  error = false;

  constructor(private bookService: BookService,
    public dialogRef: MatDialogRef<NewBookInstanceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  create() {
    this.bookService.createBook(this.code, this.data.codNominalBook).subscribe(() => {
      this.onNoClick();
    }, err => this.error = true);
  }
}
