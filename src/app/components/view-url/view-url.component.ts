import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UrlService } from '../../services/url.service';
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
    this.url_service.get(this.url_id).subscribe((res:any) => {
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

  edit(url_id:number) {
    const data = {tab:'edit_url', url_id:url_id};
    this.editUrl.emit(data);
  }

  delete(url_id:number) {
    this.url_service.delete(url_id).subscribe((res:any) => {
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
