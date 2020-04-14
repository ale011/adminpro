import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/index.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
