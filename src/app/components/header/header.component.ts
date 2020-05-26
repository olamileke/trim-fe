import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  user:any;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.user = JSON.parse(localStorage.getItem('trim_user'));
  }

}
