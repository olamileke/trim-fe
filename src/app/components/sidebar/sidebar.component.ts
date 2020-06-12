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
  responsive:boolean = false;

  ngOnInit(): void {
    this.determineResponsive();
  }

  determineResponsive(): void {
    if(screen.width < 1025) {
        this.responsive = true;
    }
  }

  emitToggle(tab:string): void {
    this.activeTab = tab;
    this.toggle.emit(tab);
  }

}
