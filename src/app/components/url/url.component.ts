import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {

  constructor() { }
  @Input() url;
  app_url:string = environment.client_url; 
  
  ngOnInit(): void {
  }

}
