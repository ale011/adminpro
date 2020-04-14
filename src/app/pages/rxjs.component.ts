import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable().subscribe(num => {
      console.log('Subs ', num);
    },
    error => {
      console.error('El error acá', error);
    },
    ()  => console.log('el observador terminó'));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Dejando la pagina y desuscribiendo...');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      let resp: any;

      const intervalo = setInterval(() => {
        contador += 1;
        resp = {
          value: contador
        };

        observer.next(resp);

      }, 1000);
    }).pipe(
      map((resp: any) => resp.value),
      filter((value: any, index) => {
        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
