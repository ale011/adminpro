import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from 'src/app/services/index.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {


  constructor(public settings: SettingsService) { }

  ngOnInit() {
    this.placeCheck();
  }

  changeTheme(theme: string, link: ElementRef) {
    this.settings.applyTheme(theme);
    this.applyCheck(link);
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');

    for (const ref of selectors) {
      ref.classList.remove('working');
    }
  }

  placeCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this.settings.settings.theme;
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
