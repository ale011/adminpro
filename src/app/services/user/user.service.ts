import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { SERVICE_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadFromStorage();
  }

  createUser(user: User) {
    const url = SERVICE_URL + '/usuario';

    return this.http.post(url, user).pipe(
      map(
        (resp: any) => {
          swal('User created', resp.usuario.email, 'success');
          return resp.usuario;
        }
      )
    );
  }

  login(user: User, remember: boolean = false) {
    const url = SERVICE_URL + '/login';

    if ( remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, user).pipe(
      map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.usuario));
        return true;
      })
    );
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    this.loadFromStorage();
    return this.token.length > 5 ? true : false;
  }

  loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }
}
