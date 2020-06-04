import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupData } from '../../models/group.data';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private group:GroupService, private notif:NotificationService) { }
  groups: any=[];
  @Output() viewGroup = new EventEmitter();
  pages:number;
  activePage:number = 1;

  ngOnInit(): void {
    this.fetch(1);
  }

  fetch(page:number): void { 
    this.group.getAll(page).subscribe((res:GroupData) => {
        this.groups = res.data['groups'];
        this.pages = Math.ceil(res.data['total_groups']/environment.per_page);
        this.activePage = page;
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
