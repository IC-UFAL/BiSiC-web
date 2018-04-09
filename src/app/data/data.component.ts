import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  v: any;

  constructor(private dataService: DataService) {
    console.log('Chamou');
    this.dataService.getUser().subscribe(
      (data: any) => {
        console.log(data);
        this.v = data;
      } ,
      error => {
        alert('Erro em Data!');
        console.log(error);
      }
    );
  }

}
