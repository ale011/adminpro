import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;
  public oculto = 'oculto';

  public notification = new EventEmitter<any>();

  constructor() { }

  public hideModal() {
    this.oculto = 'oculto';
    this.type = null;
    this.id = null;
  }

  public showModal(type: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.type = type;


  }

}
