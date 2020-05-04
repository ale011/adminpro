import { Injectable } from '@angular/core';
import { SERVICE_URL } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private uploadFileService: UploadFileService
  ) { }

  /* public changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile( file, 'hospitales', id).then((resp: any) => {

      this.hos.img = resp.usuario.img;
      swal('Image updated', this.user.name, 'success');
      this.saveStorage(resp.usuario._id, resp.usuario.token, this.user);

    }).catch(resp => {
      console.log('un error', resp);
    });
  } */

  public loadHospitals(from: number = 0) {
    const url = SERVICE_URL + `/hospital?desde=${from}`;
    return this.http.get(url);
  }

  public searchHospitals(term: string) {
    const url = SERVICE_URL + `/busqueda/coleccion/hospitales/${term}`;
    return this.http.get( url ).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  createHospital(hospital: string) {
    const url = SERVICE_URL + `/hospital?token=${this.userService.token}`;

    return this.http.post(url, {name: hospital}).pipe(
      map(
        (resp: any) => {
          swal('Hospital created', resp.hospital.name, 'success');
          return resp.hospital;
        }
      )
    );
  }

  public getHospital(id: string) {
    const url = SERVICE_URL + `/hospital/${id}`;
    return this.http.get( url );
  }

  public deleteHospital(id: string) {
    const url = SERVICE_URL + `/hospital/${id}?token=${this.userService.token}`;
    return this.http.delete( url );
  }

  public updateHospital(hospital: Hospital) {
    const url = SERVICE_URL + '/hospital/' + hospital._id + '?token=' + this.userService.token;

    return this.http.put(url, hospital).pipe(map( (resp: any) => {
      swal('Updated Hospital', hospital.name);
      return true;
    }));
  }
}
