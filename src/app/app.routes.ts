import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'datacenters',
    loadComponent: () => import('./pages/datacenters/datacenters').then(m => m.DatacentersComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
