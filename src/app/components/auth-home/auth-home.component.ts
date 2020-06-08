import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

  constructor() { }
  tabs: any = { dashboard:true, new_group:false, edit_group:false, groups:false, group:false,
  shorten:false, short_urls:false, url:false, edit_url:false, redirects:false }
  
  activeGroupID:number;
  activeUrlID:number;

  ngOnInit(): void {
  }

  switchToUrl(tab:string, url_id:number) {
    this.switchTab(tab);
    this.activeUrlID = url_id;
  }

  switchTab(tab:string, group_id=null): void {

    if(group_id) {
        this.activeGroupID = group_id;
    }

    Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = false;
    })

    this.tabs[tab] = true;
  }

}
