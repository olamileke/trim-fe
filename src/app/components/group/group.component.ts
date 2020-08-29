import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';
import { UrlService } from '../../services/url.service';
import { UrlsData } from '../../models/urls.data';
import { RedirectService } from '../../services/redirect.service';
import { RedirectsData } from '../../models/redirects.data';
import { environment } from '../../../environments/environment.prod';
import { GroupData } from 'src/app/models/group.data';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group_id;
  group:any;
  @Output() editGroup = new EventEmitter();
  @Output() deletedGroup = new EventEmitter();
  @Output() viewUrl = new EventEmitter();
  @Output() viewGroups = new EventEmitter();
  viewUrls:boolean = true;
  fetched:boolean = false;
  urls:any;
  redirects:any;
  urlPages:number;
  redirectPages:number;
  activeUrlPage:number = 1;
  activeRedirectPage:number = 1;

  constructor(private group_service:GroupService, private notif:NotificationService,
  private url:UrlService, private redirect:RedirectService) { }

  ngOnInit(): void {
    this.fetch(); 
  }

  fetch(): void {
    this.group_service.get(this.group_id).subscribe((res:GroupData) => {
        this.group = res.data;
        this.urls = res.data.urls;
        this.redirects = res.data.redirects;
        this.urlPages = Math.ceil(res.data.num_urls / environment.per_page);
        this.redirectPages = Math.ceil(res.data.num_redirects / (environment.per_page * 2));
        this.fetched = true;
    })
  }

  fetchUrls(page:number): void {
    this.url.getAll(page, this.group.id).subscribe((res:UrlsData) => {
        this.urls = res.data.urls;
        this.activeUrlPage = page;
    })
  }

  fetchRedirects(page:number): void {
    this.redirect.getAll(page, this.group.id).subscribe((res:RedirectsData) => {
        this.redirects = res.data.redirects;
        this.activeRedirectPage = page;
    })
  }

  getAlias(name:string): string {
    const splits = name.split(' ')
    let alias:string = '';

    splits.forEach(split => {
        alias += split[0];
    })

    return alias; 
  }

  view(param:boolean): void {
    this.viewUrls = param;
  }

  edit(): void {
    const data = {tab:'edit_group', group:this.group};
    this.editGroup.emit(data)
  }

  delete(): void { 
    const del = confirm(`are you sure you want to delete ${this.group.name} ?`);

    if(!del) {
        return;
    }
    
    this.group_service.delete(this.group_id).subscribe((res:any) => {
        this.notif.success(`${this.group.name} deleted successfully`);
        this.deletedGroup.emit('groups');
    })
  }

  viewUrlDetails(url_id:number) {
    const data = {tab:'url', url_id:url_id}
    this.viewUrl.emit(data);
  }

  emitViewGroups():void {
    this.viewGroups.emit('groups');
  }
}
