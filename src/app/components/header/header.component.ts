import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService) { }
  
  options:boolean = false;
  user:any;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.user = JSON.parse(localStorage.getItem('trim_user'));
  }

  toggleOptions(): void {
    this.options = !this.options;
  }

  logout(): void {
    this.auth.logout();
  }

}
