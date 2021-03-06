import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit { 

  constructor(private fb:FormBuilder, private notif:NotificationService, private group_service:GroupService) { }

  @Input() group:Group;
  @Output() viewGroup = new EventEmitter();
  editForm:FormGroup;
  groupName:string;
  urlRegex:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[-/\\w .?=&]*/?';
  fetched:boolean = true;

  ngOnInit(): void {
    this.createForm(this.group.name, this.group.url);
  }

  createForm(name:string, url:string): void {
    this.editForm = this.fb.group({
        name:[name, [Validators.required, Validators.minLength(5)]],
        url:[url, [Validators.required, Validators.pattern(this.urlRegex)]]
    })
  }

  submit(form:FormGroup): void {
    this.group_service.edit(this.group.id, form.value).subscribe((res:any) => {
        this.notif.success('Group edited successfully');
    })
  }

  emitViewGroup(): void {
    const data = {tab:'group', id:this.group.id}; 
    this.viewGroup.emit(data);
  }

  get name() {
    return this.editForm.get('name');
  }
  
  get url() {
    return this.editForm.get('url');
  }

}
