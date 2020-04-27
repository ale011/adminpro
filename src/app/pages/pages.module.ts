import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
// @todo: luego borrar
import { IncrementerComponent } from '../custom/incrementer/incrementer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementerComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES,
        PipesModule,
        CommonModule
    ]
})
export class PagesModule { }
