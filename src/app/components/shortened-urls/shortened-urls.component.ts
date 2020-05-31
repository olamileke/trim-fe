import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UrlService } from '../../services/url.service'; 
import { NotificationService } from '../../services/notification.service';
import { UrlData } from '../../models/url.data';

@Component({
  selector: 'app-shortened-urls',
  templateUrl: './shortened-urls.component.html',
  styleUrls: ['./shortened-urls.component.css']
})
export class ShortenedUrlsComponent implements OnInit {

  constructor(private url:UrlService, private notif:NotificationService) { }
  urls: any = [];
  @Output() viewUrl = new EventEmitter();

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.url.getAll().subscribe((res:UrlData) => {
        this.urls = res.data;
    })
  }

  delete(id:number): void {

    this.url.delete(id).subscribe((res:any) => {
        this.notif.success('Url deleted successfully');
        this.urls = this.urls.filter(url => url.id != id);
    })
  }

  viewUrlDetails(url_id:number): void {
    this.viewUrl.emit({tab:'url', url_id:url_id});
  }

}
