import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UrlService } from '../../services/url.service'; 
import { NotificationService } from '../../services/notification.service';
import { UrlsData } from '../../models/urls.data';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-shortened-urls',
  templateUrl: './shortened-urls.component.html',
  styleUrls: ['./shortened-urls.component.css']
})
export class ShortenedUrlsComponent implements OnInit {

  constructor(private url:UrlService, private notif:NotificationService) { }
  urls: any = [];
  @Output() viewUrl = new EventEmitter();
  pages:number;
  activePage:number;
  fetched:boolean = false;

  ngOnInit(): void {
    this.fetch(1);
  }

  fetch(page:number): void {
    this.url.getAll(page).subscribe((res:UrlsData) => {
        this.urls = res.data.urls;
        const pages = res.data.total_urls / environment.per_page;
        this.pages = Math.ceil(pages);
        this.activePage = page;
        this.fetched = true;
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
