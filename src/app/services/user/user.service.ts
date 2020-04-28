import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { SERVICE_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public uploadFileService: UploadFileService
  ) {
    this.loadFromStorage();
  }

  private saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
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

  public updateUser(user: User) {
    const url = SERVICE_URL + '/usuario/' + user._id + '?token=' + this.token;

    return this.http.put(url, user).pipe(map( (resp: any) => {

      if ( user._id === this.user._id) {
        this.saveStorage(resp.usuario._id, this.token, resp.usuario);
      }

      swal('Updated user', this.user.name);
      return true;
    }));
  }

  public changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile( file, 'usuarios', id).then((resp: any) => {

      this.user.img = resp.usuario.img;
      swal('Image updated', this.user.name, 'success');
      this.saveStorage(resp.usuario._id, resp.usuario.token, this.user);

    }).catch(resp => {
      console.log('un error', resp);
    });
  }

  public loadUsers(from: number = 0) {
    const url = SERVICE_URL + `/usuario?desde=${from}`;
    return this.http.get(url);
  }

  public searchUsers(term: string) {
    const url = SERVICE_URL + `/busqueda/coleccion/usuarios/${term}`;
    return this.http.get( url ).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  public deleteUser(id: string) {
    const url = SERVICE_URL + `/usuario/${id}?token=${this.token}`;
    return this.http.delete( url );
  }
}
