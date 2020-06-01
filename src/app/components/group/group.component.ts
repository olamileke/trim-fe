import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group_id;
  group:any;
  @Output() editGroup = new EventEmitter();
  @Output() deletedGroup = new EventEmitter();
  @Output() viewUrl = new EventEmitter();
  viewUrls:boolean = true;

  constructor(private group_service:GroupService, private notif:NotificationService) { }

  ngOnInit(): void {
    this.fetch(); 
  }

  fetch(): void {
    this.group_service.get(this.group_id).subscribe((res:any) => {
        this.group = res.data;
    })
  }

  getAlias(name:string): string {
    const splits = name.split(' ')
    let alias:string = '';

    splits.forEach(split => {
        alias += split[0];
    })

    return alias;
  }

  view(param:boolean): void {
    this.viewUrls = param;
  }

  edit(id:number): void {
    const data = {tab:'edit_group', id:id};
    this.editGroup.emit(data)
  }

  delete(id:number): void {
    this.group_service.delete(id).subscribe((res:any) => {
        this.notif.success(`${this.group.name} deleted successfully`);
        this.deletedGroup.emit('groups');
    })
  }

  viewUrlDetails(url_id:number) {
    const data = {tab:'url', url_id:url_id}
    this.viewUrl.emit(data);
  }
}
