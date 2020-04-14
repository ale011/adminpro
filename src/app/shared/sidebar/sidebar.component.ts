import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebar: SidebarService,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  public logout() {
    this.userService.logout();
  }

}
