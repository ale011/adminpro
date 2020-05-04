import { Component, OnInit } from '@angular/core';
import { MedicService } from 'src/app/services/index.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {

  public medics: Medico[] = [];
  totalRecords = 0;

  constructor( private medicService: MedicService) { }

  ngOnInit() {
    this.loadMedics();
  }

  public loadMedics() {
    this.medicService.loadMedics().subscribe((resp: any) => {
      this.medics = resp.medicos;
      this.totalRecords = resp.total;
    });
  }

  public deleteMedic(medic: Medico) {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete medic ${medic.nombre} ?`,
      icon: 'warning',
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.medicService.deleteMedic(medic._id).subscribe((resp: any) => {
            swal('Medic deleted', `Deleted Hospital ${medic.nombre}`, 'success');
            this.loadMedics();
          });
        }
      });
  }

  public searchMedics(term: string) {
    if (term.length < 1) {
      this.loadMedics();
      return;
    }

    this.medicService.searchMedics(term).subscribe((medicos: any) => {
      this.medics = medicos;
      this.totalRecords = medicos.length;
    });
  }

}
