import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Group } from '../../models/group';
import { Url } from '../../models/url';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

  constructor() { }
  tabs: any = { dashboard:true, new_group:false, edit_group:false, groups:false, group:false,
  shorten:false, short_urls:false, url:false, edit_url:false, redirects:false }
  
  activeGroup:Group;
  activeGroupID:number;
  activeUrl:Url;
  activeUrlID:number;
  urlFromGroup:boolean;
  displaySidebar:boolean = false;
  @ViewChild(HeaderComponent) header;

  ngOnInit(): void {
  }

  switchToUrl(tab:string, url_id:number, from_group=false) {
    this.switchTab(tab);
    this.activeUrlID = url_id;
    this.urlFromGroup = from_group;
  }

  switchToGroup(tab:string, group_id:number) {
    this.switchTab(tab);

    if(group_id) {
        this.activeGroupID = group_id;
    }
  }

  switchTab(tab:string, group=null, url=null, sidebar=null): void {

    if(group) {
        this.activeGroup = group;
    }

    if(url) {
        this.activeUrl = url;
    }

    Object.keys(this.tabs).forEach(key => {
        this.tabs[key] = false;
    })

    this.tabs[tab] = true;

    if(screen.width <= 1025 && sidebar) {
        this.toggleSidebar();
    }
  }

  toggleSidebar(layer=false): void {

    if(layer) {
        if(!this.displaySidebar) {
            return;
        }
    }

    this.displaySidebar = !this.displaySidebar;
    this.header.setBarsClickedState();
  }

}
