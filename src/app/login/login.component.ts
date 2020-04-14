import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/index.service';
import { User } from '../models/user.model';

declare function init_plugins();

declare const gapi: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public userService: UserService
    ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.remember = true;
    }

    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '945852830460-1d086j90d1varesk6s9tfef8bk4jha23.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile, email'
      });

      this.attachSignIn(document.getElementById('loginGoogle'))
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.remember).subscribe(
      loggedIn => {
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      }
    );
  }

}
