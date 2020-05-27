import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupData } from '../../../models/group.data';
import { GroupService } from '../../../services/group.service';
import { UrlService } from '../../../services/url.service';
import { UrlData } from '../../../models/url.data';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.css']
})
export class ShortenComponent implements OnInit {

  constructor(private group:GroupService, private fb:FormBuilder) { }
  shortenForm:FormGroup;
  groups:any;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  loaded:boolean = false;
  selectedGroupUrl:string = 'None';

  ngOnInit(): void {
    this.fetch();
    this.createForm();
  }

  fetch(): void {
    this.group.get().subscribe((res:GroupData) => {
        this.groups = res.data;
        this.loaded = true;
    })
  }

  createForm(): void {
    this.shortenForm = this.fb.group({
        'url':['', [Validators.required, Validators.pattern(this.urlRegex)]],
        'group':['none', [Validators.required]],
        'length':['5', [Validators.required]]
    })
  }

  toggleUrlText(): void {
    
    const group_id = this.shortenForm.get('group').value;

    if(group_id != 'none') {
        const group = this.groups.find(group => group.id == group_id);
        this.shortenForm.get('url').setValue(group.url);
        this.selectedGroupUrl = group.url;
    }
    else {
        this.shortenForm.get('url').setValue("");
        this.selectedGroupUrl = 'none';
    }
  }

  setUrl(url:string): void {

    if(this.selectedGroupUrl != 'none') {
        if(!url.startsWith(this.selectedGroupUrl)) {
            this.shortenForm.get('url').setValue(this.selectedGroupUrl);
        }
    }
  }

  get url(): any {
    return this.shortenForm.get('url');
  }

}
