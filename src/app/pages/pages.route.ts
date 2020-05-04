import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs.component';
import { LoginGuardGuard } from '../services/index.service';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';

const pagesRoutes: Routes = [
    { path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progreso'} },
            { path: 'graficas1', component: Graficas1Component, data: {title: 'Gráficas'} },
            { path: 'promises', component: PromisesComponent , data: {title: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent , data: {title: 'Reactive'}},
            { path: 'account-settings', component: AccountSettingsComponent , data: {title: 'Account Settings'}},
            { path: 'profile', component: ProfileComponent , data: {title: 'My Profile'}},

            // Maintenance
            { path: 'users', component: UsersComponent , data: {title: 'Users maintenance'}},
            { path: 'hospitals', component: HospitalsComponent , data: {title: 'Hospitals maintenance'}},
            { path: 'medics', component: MedicsComponent , data: {title: 'Medics maintenance'}},
            { path: 'medic/:id', component: MedicComponent , data: {title: 'Edit medic'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: '**', component: NopagefoundComponent}
        ]}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
