import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor() { }

  clickHome1() {
    console.log('Home1');
  }
  clickHome2() {
    console.log('Home2');
  }
  clickHome3() {
    console.log('Home3');
  }
  clickHome4() {
    console.log('Home4');
  }
}
