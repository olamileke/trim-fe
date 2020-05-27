import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupData } from '../../models/group.data';
import { Group } from '../../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private group:GroupService) { }
  groups: any=[];

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.group.get().subscribe((res:GroupData) => {
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

}
