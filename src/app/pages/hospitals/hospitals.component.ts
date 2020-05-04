import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospitals/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  public loading = false;
  public hospitals: Hospital[] = [];
  public totalRecords = 0;
  public from = 0;

  constructor(
    private hospitalService: HospitalService,
    private modalUploadService: ModalUploadService
  ) { }

  public loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals(this.from).subscribe((resp: any) => {
      this.totalRecords = resp.total;
      this.hospitals = resp.hospitales;
      this.loading = false;
    });
  }

  public searchHospital(term: string) {

    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.hospitalService.searchHospitals(term).subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
      console.log('resultado de busqueda: ', hospitals);
    });
  }

  public createHospital() {
    swal({
      text: 'Create a new Hospital',
      content: "input",
      button: {
        text: "Create",
        closeModal: true,
      },
    })
      .then((name: string) => {
        if (!name || name.length === 0) {
          return;
        }

        this.hospitalService.createHospital(name).subscribe((resp: any) => {
          this.loadHospitals();
        });
      })
      .catch(err => {
        if (err) {
          swal("Problem", "Hospital creation failed", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  }

  public updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe();
  }

  public deletHospital(hospital: Hospital) {

    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete hospital ${hospital.name} ?`,
      icon: 'warning',
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.hospitalService.deleteHospital(hospital._id).subscribe((resp: any) => {
            swal('Hospital deleted', `Deleted Hospital ${hospital.name}`, 'success');
            this.loadHospitals();
          });
        }
      });
  }

  public showModal(type: string, id: string) {
    this.modalUploadService.showModal(type, id);
  }

  ngOnInit() {
    this.loadHospitals();

    this.modalUploadService.notification.subscribe(() => this.loadHospitals());
  }

}
