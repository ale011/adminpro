import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Account Settings', url: '/account settings'},
        {titulo: 'Promises', url: '/promises'},
        {titulo: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/users' },
        { titulo: 'Hospitales', url: '/hospitals' },
        { titulo: 'Médicos', url: '/medics' }
      ]
    }
  ];

  constructor() { }
}
