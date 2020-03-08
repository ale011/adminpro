import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public sidebar: SidebarService) { }

  ngOnInit() {
  }

}
