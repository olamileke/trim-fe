import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {

  constructor() { }

  @Input() url;
  @Output() viewUrl = new EventEmitter();
  app_url:string = environment.client_url; 

  ngOnInit(): void {
  }

  view(): void {
    this.viewUrl.emit(this.url.id);
  }

}
