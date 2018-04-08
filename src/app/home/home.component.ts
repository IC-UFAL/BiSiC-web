import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_name: string;
  user_pswd: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/data']);
  }

}
