import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {
  @ViewChild('progressBar', {static: false}) progressBar: ElementRef;
  @Input() progress = 50;
  @Input() label = 'Leyenda';
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  changeValue(value): void {
    if (this.progress > 100) {
      this.progress = 100;
      return;
    }

    if (this.progress < 0) {
      this.progress = 0;
      return;
    }

    this.progress += value;
    this.valueChange.emit(this.progress);
    this.progressBar.nativeElement.focus();
  }

  onChange(newValue: number) {

    if (newValue > 100) {
      this.progress = 100;
    } else if (this.progress < 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.progressBar.nativeElement.value = Number(this.progress);
    this.valueChange.emit(this.progress);
  }
  ngOnInit() { }
}
