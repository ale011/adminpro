import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/index.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
