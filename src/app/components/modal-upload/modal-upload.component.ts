import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/index.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imageToUpload: File;
  public tempImg: any;

  constructor(
    private uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
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

  public uploadImage() {
    this.uploadFileService.uploadFile(this.imageToUpload, this.modalUploadService.type, this.modalUploadService.id).then(resp =>{

      this.modalUploadService.notification.emit(resp);
      this.hideModal();

    }).catch(error => {
      console.log(error);
    });
  }

  public hideModal() {
    this.imageToUpload = null;
    this.tempImg = null;

    this.modalUploadService.hideModal();
  }

}
