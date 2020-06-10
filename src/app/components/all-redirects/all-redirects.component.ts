import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../../services/redirect.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-all-redirects',
  templateUrl: './all-redirects.component.html',
  styleUrls: ['./all-redirects.component.css']
})
export class AllRedirectsComponent implements OnInit {

  constructor(private redirect:RedirectService) { }
  redirects:any;
  pages:number;
  activePage:number;

  ngOnInit(): void {
    this.fetch(1);
  }

  fetch(page:number): void {
    this.redirect.getAll(page).subscribe((res:any) => {
        this.redirects = res.data['redirects'];
        this.pages = Math.ceil( res.data['total_redirects'] / (environment.per_page * 2) )
        this.activePage = page;
    })
  }

}
