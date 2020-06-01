import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-redirect',
  templateUrl: './view-redirect.component.html',
  styleUrls: ['./view-redirect.component.css']
})
export class ViewRedirectComponent implements OnInit {

  constructor() { }

  @Input() redirect;

  ngOnInit(): void {
  }

}
