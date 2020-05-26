import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';
import { GroupData } from '../../models/group.data';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor(private fb:FormBuilder, private group:GroupService,
  private notif:NotificationService) { }

  newForm:FormGroup;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.newForm = this.fb.group({
        'name':['', [Validators.required, Validators.minLength(5)]],
        'url':['', [Validators.required, Validators.pattern(this.urlRegex)]]
    })
  }

  submit(form:FormGroup): void {

    this.group.create(form.value).subscribe((res:GroupData) => {
        this.notif.success('New group created');
        form.reset();
    })
  }

  get name() {
    return this.newForm.get('name');
  }

  get url() {
    return this.newForm.get('url');
  }

}
