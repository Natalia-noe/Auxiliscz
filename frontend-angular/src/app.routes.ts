import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { IncidentesComponent } from './incidentes/incidentes.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'incidentes',
    component: IncidentesComponent
  }
];
