import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  constructor(private group:GroupService, private fb:FormBuilder,
  private notif:NotificationService) { }

  @Input() group_id;
  editForm:FormGroup;
  groupName:string;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.group.get(this.group_id).subscribe((res:any) => {
        this.groupName = res.data.name;
        this.createForm(res.data.name, res.data.url);
    })
  }

  createForm(name:string, url:string): void {
    this.editForm = this.fb.group({
        name:[name, [Validators.required, Validators.minLength(5)]],
        url:[url, [Validators.required, Validators.pattern(this.urlRegex)]]
    })
  }

  submit(form:FormGroup): void {
    this.group.edit(this.group_id, form.value).subscribe((res:any) => {
        this.notif.success('Group edited successfully');
    })
  }

  get name() {
    return this.editForm.get('name');
  }
  
  get url() {
    return this.editForm.get('url');
  }

}