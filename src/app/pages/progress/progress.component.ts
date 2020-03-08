import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1 = 50;
  progress2 = 28;

  constructor() { }

  ngOnInit() {
  }

  updateProgress(evt: number) {
    console.log('el evt', evt);
  }
}
