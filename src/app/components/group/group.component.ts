import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';
import { UrlService } from '../../services/url.service';
import { UrlData } from '../../models/url.data';
import { RedirectService } from '../../services/redirect.service';
import { environment } from '../../../environments/environment.prod';

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
    this.group_service.get(this.group_id).subscribe((res:any) => {
        this.group = res.data;
        this.urls = res.data['urls'];
        this.redirects = res.data['redirects'];
        this.urlPages = Math.ceil(res.data['num_urls']/environment.per_page);
        this.redirectPages = Math.ceil(res.data['num_redirects']/environment.per_page);
        this.fetched = true;
    })
  }

  fetchUrls(page:number): void {
    this.url.getAll(page, this.group.id).subscribe((res:UrlData) => {
        this.urls = res.data['urls'];
        this.activeUrlPage = page;
    })
  }

  fetchRedirects(page:number): void {
    this.redirect.getAll(page, this.group.id).subscribe((res:any) => {
        this.redirects = res.data['redirects'];
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
    const data = {tab:'edit_group', id:this.group_id};
    this.editGroup.emit(data)
  }

  delete(): void {
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
