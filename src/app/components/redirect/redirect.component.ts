import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RedirectService } from '../../services/redirect.service';

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

  checkUrl(): void {
    const short_path = this.rt.snapshot.paramMap.get('url');

    const data = {short_path:short_path};
    this.redirect.check(data).subscribe((res:any) => {
        location.replace(res.data.path);
    })
  }

}
