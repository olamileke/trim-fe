import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group_id;
  group:any;
  @Output() editGroup = new EventEmitter();
  constructor(private group_service:GroupService) { }

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

  edit(id:number): void {
    const data = {tab:'edit_group', id:id};
    this.editGroup.emit(data)
  }
}