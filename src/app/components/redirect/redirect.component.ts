import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '../../services/redirect.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private rt:ActivatedRoute, private redirect:RedirectService) { }

  ngOnInit(): void {
    this.checkUrl();
  }

  short_link:string;
  app_url:string = environment.client_url;

  checkUrl(): void {
    this.short_link = this.rt.snapshot.paramMap.get('url');
    let referrer;
    document.referrer ? referrer = document.referrer : referrer = ''; 

    const data = {short_path:this.short_link, referrer:referrer};
    this.redirect.check(data).subscribe((res:any) => {
        location.replace(res.data.path);
    })
  }

}
