import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { UrlData } from '../../models/url.data';
import { Url } from '../../models/url';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-url',
  templateUrl: './edit-url.component.html',
  styleUrls: ['./edit-url.component.css']
})
export class EditUrlComponent implements OnInit {

  constructor(private url_service:UrlService, private fb:FormBuilder,
  private notif:NotificationService) {}

  @Input() url:Url;
  @Output() viewUrl = new EventEmitter();
  editForm:FormGroup;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-?=&]*/?';

  ngOnInit(): void {
    this.createForm(this.url.path, this.url.short_path);
  }

  createForm(path:string, short_path:string): void {
    this.editForm = this.fb.group({
        'url':[path, [Validators.required, Validators.pattern(this.urlRegex)]],
        'short_url':[short_path, [Validators.required, Validators.minLength(3)]]
    })
  }

  setUrlText(text:string) {
    if(this.url.group_path) {
        if(!text.includes(this.url.group_path)) {
            this.editForm.get('url').setValue(this.url.group_path);
        }
    }
  }

  submit(form:FormGroup): void {
    this.url_service.edit(this.url.id, form.value).subscribe((res:any) => {
        this.notif.success('Url updated successfully');
    })
  }

  get formUrl(): any {
    return this.editForm.get('url');
  }

  get formShortUrl(): any {
    return this.editForm.get('short_url');
  }

  emitViewUrl():void {
    const data = {tab:'url', url_id:this.url.id};
    this.viewUrl.emit(data);
  }

}
