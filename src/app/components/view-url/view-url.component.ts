import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { UrlData } from '../../models/url.data';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.css']
})
export class ViewUrlComponent implements OnInit {

  constructor(private url_service:UrlService, private notif:NotificationService) { }
  
  @Input() url_id:number;
  @Input() group_id:number;
  @Input() from_group:boolean;
  @Output() editUrl = new EventEmitter();
  @Output() urls = new EventEmitter();
  @Output() viewUrls = new EventEmitter();
  @Output() viewGroup = new EventEmitter();
  url:any;
  app_url = environment.client_url;
  fetched:boolean = false;

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.url_service.get(this.url_id).subscribe((res:UrlData) => {
        this.url = res.data;
        this.fetched = true;
    })
  }

  getGroupName(name:string) {
    if(name) {
        return name + '. ';
    }

    return '';
  } 

  edit() {
    const data = {tab:'edit_url', url:this.url};
    this.editUrl.emit(data);
  }

  delete() {
    const del = confirm(`are you sure you want to delete ${this.url.short_path} ?`);

    if(!del) {
        return;
    }

    this.url_service.delete(this.url.id).subscribe((res:any) => {
        this.urls.emit();
        this.notif.success('Url deleted successfully');
    })
  }

  emitViewUrls():void {
    this.viewUrls.emit('short_urls');
  }

  emitViewGroup(): void {
    const data = {tab:'group', id:this.group_id};
    this.viewGroup.emit(data);
  }

  emit():void {
    if(this.from_group) {
        this.emitViewGroup();
        return;
    }

    this.emitViewUrls();
  }

}
