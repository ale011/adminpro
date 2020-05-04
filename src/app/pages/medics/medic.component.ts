import { Component, OnInit } from '@angular/core';
import { MedicService } from 'src/app/services/index.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospitals/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public medic: Medico = new Medico('', '', '', '', '');
  public hospital: Hospital = new Hospital('');

  constructor(
    private medicService: MedicService,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params.id;

      if ( id !== 'new') {
        this.loadMedicById(id);
      }
    });
  }

  ngOnInit() {
    this.loadHospitals();

    this.modalUploadService.notification.subscribe((resp: any) => {
      this.medic.img = resp.medic.img;
    });
  }

  private loadMedicById(id: string) {
    this.medicService.getMedicById(id).subscribe(medico => {
      this.medic = medico;
      this.medic.hospital = medico.hospital._id;
      this.changeHospital(this.medic.hospital);
    });
  }

  public saveMedic(f: NgForm) {

    if (f.valid) {
      this.createMedic(this.medic);
    }
  }

  public loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((resp: any) => {
      this.hospitals = resp.hospitales;
    });
  }

  public createMedic(medic: Medico) {
    this.medicService.createMedic(medic).subscribe();
  }

  public changeHospital( evt ) {
    this.hospitalService.getHospital(evt).subscribe((resp: any) => {
      this.hospital = resp.hospital;
    });
  }

  public showModal(type: string, id: string) {
    this.modalUploadService.showModal(type, id);
  }
}
