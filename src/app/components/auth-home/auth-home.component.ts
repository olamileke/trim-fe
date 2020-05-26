import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

  constructor() { }
  tabs: any = { dashboard:true, new_group:false, groups:false, short:false }

  ngOnInit(): void {
  }

  switchTab(tab:string): void {

    Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = false;
    })

    this.tabs[tab] = true;
  }

}
