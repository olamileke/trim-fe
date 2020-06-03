import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupData } from '../../models/group.data';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private group:GroupService, private notif:NotificationService) { }
  groups: any=[];
  @Output() viewGroup = new EventEmitter();

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void { 
    this.group.getAll().subscribe((res:GroupData) => {
        this.groups = res.data;
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

  view(id:number) {
    const data = {tab:'group', id:id};
    this.viewGroup.emit(data);
  }

}
