import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupData } from '../../../models/group.data';
import { GroupService } from '../../../services/group.service';
import { UrlService } from '../../../services/url.service';
import { UrlData } from '../../../models/url.data';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.css']
})
export class ShortenComponent implements OnInit {

  constructor(private group:GroupService, private fb:FormBuilder,
  private url:UrlService) { }

  shortenForm:FormGroup;
  groups:any;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  loaded:boolean = false;
  shortened:boolean = false;
  selectedGroupUrl:string = 'None';
  shortenedUrl:string = '';

  ngOnInit(): void {
    this.fetch();
    this.createForm();
  }

  fetch(): void {
    this.group.getAll(null, true).subscribe((res:GroupData) => {
        this.groups = res.data['groups'];
        this.loaded = true;
    })
  }

  createForm(): void {
    this.shortenForm = this.fb.group({
        'url':['', [Validators.required, Validators.pattern(this.urlRegex)]],
        'group':['none', [Validators.required]],
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

    if(this.selectedGroupUrl.toLowerCase() != 'none') {
        if(!url.startsWith(this.selectedGroupUrl)) {
            this.shortenForm.get('url').setValue(this.selectedGroupUrl);
        }
    }
  }

  submit(form:FormGroup) {
    
    const data = form.value;
    data.group == 'none' ? data.group = null : data.group = data.group;
    
    this.url.create(data).subscribe((res:UrlData) => {
        form.get('url').markAsPristine();
        form.get('url').setValue('');
        form.get('group').setValue('none'); 
        this.shortened = true;
        this.shortenedUrl = environment.client_url + res.data['short_path'];    
    })
  }

  get path(): any {
    return this.shortenForm.get('url');
  }

}
