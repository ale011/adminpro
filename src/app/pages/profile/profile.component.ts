import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/index.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: User;
  public imageToUpload: File;
  public tempImg: any;

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  public save( user: User ) {
    this.user.name = user.name;

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe((resp: any) => {
      console.log('la resp: ', resp);
    });
  }

  public selectImage(fi: File) {

    if (!fi) {
      this.imageToUpload = null;
      return;
    }

    if (fi.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = fi;

    const reader = new FileReader();

    let urlTempImg = reader.readAsDataURL(fi);

    reader.onloadend = () => this.tempImg = reader.result;

  }

  public updateImage() {
    this.userService.changeImage(this.imageToUpload, this.user._id);
  }
}
