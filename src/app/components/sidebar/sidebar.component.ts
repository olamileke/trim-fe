import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Output() toggle = new EventEmitter();
  activeTab: string = 'dashboard';

  ngOnInit(): void {
  }

  emitToggle(tab:string): void {
    this.activeTab = tab;
    this.toggle.emit(tab);
  }

}
