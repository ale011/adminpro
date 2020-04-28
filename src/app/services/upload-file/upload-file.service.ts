import { Injectable } from '@angular/core';
import { SERVICE_URL } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(fi: File, type: string, id: string) {

    return new Promise ((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', fi, fi.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }
      };

      const url = SERVICE_URL + `/upload/${type}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send( formData );
    });
  }
}
