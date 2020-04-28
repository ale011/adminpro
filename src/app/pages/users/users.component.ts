import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/index.service';
import { SERVICE_URL } from 'src/app/config/config';
import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public from = 0;
  public totalRecords = 0;
  loading = true;

  constructor(
    public userService: UserService,
    private modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.loadUsers();

    this.modalUploadService.notification.subscribe( resp => this.loadUsers());
  }

  public loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe((resp: any) => {
      console.log('la respuesta: ', resp);
      this.totalRecords = resp.total;
      this.users = resp.usuarios;
      this.loading = false;
    });
  }

  public paginar(num: number) {
    let from = this.from + num;

    console.log('el from: ', from);

    if (from >= this.totalRecords || from <= 0) {
      return;
    }
    this.from += num;

    this.loadUsers();
  }

  public searchUser(term: string) {

    if (term.length <= 0) {
      this.loadUsers();
      return;
    }

    this.userService.searchUsers(term).subscribe((users: User[]) => {
      this.users = users;
      console.log('resultado de busqueda: ', users);
    });
  }

  public deleteUser(user: User) {
    console.log('voy a borrar...', user);

    if (user._id === this.userService.user._id) {
      swal('Cant delete youself', 'Cant delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete user ${user.name} ?`,
      icon: 'warning',
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        console.log('A borrar: ', willDelete);

        this.userService.deleteUser(user._id).subscribe((resp: any) => {
          swal('Deleted!', `The user ${user.name} was deleted.`, 'success');
          this.loadUsers();
        });
      }
    });

  }

  public updateUser( user: User) {
    this.userService.updateUser(user).subscribe();
  }

  public showModal(type: string, id: string) {
    this.modalUploadService.showModal(type, id);
  }

}
