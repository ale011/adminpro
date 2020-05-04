import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public loadMedics() {
    const url = SERVICE_URL + `/medico`;
    return this.http.get( url );
  }

  public searchMedics(term: string) {
    const url = SERVICE_URL + `/busqueda/coleccion/medicos/${term}`;
    return this.http.get( url ).pipe(
      map((resp: any) => resp.medicos)
    );
  }

  public deleteMedic(id: string) {
    const url = SERVICE_URL + `/medico/${id}?token=${this.userService.token}`;
    return this.http.delete( url );
  }

  public createMedic(medic: Medico) {
    let url = SERVICE_URL + `/medico/?token=${this.userService.token}`;

    if (medic._id) {
      url = SERVICE_URL + `/medico/${medic._id}?token=${this.userService.token}`;
      return this.http.put( url, medic).pipe(
        map((resp: any) => {
          swal('Medic updated', ` ${resp.medico.nombre}`);
        }
        ));
    } else {
      return this.http.post( url, medic).pipe(
        map((resp: any) => {
          swal('Medic created', `Medic: ${resp.medico.nombre} created`);
        }
        ));
    }
  }

  public getMedicById(id: string) {
    const url = SERVICE_URL + `/medico/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }
}
