import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/index.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user;

  constructor(
    public sidebar: SidebarService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  public logout() {
    this.userService.logout();
  }

}
