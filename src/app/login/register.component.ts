import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/index.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  equals(field1: string, field2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2) {
        return null;
      }

      return {
        equals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl( null, Validators.email),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      tos: new FormControl(false)
  }, {validators: this.equals('password', 'password2')}
    );
  }

  register() {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.tos) {
      swal('Important', 'You must accept the TOS', 'warning');
      return;
    }

    let user = new User (
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser( user ).subscribe(resp => {
      this.router.navigate(['/login']);
    });
  }

}
