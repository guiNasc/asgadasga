import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/* const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'clients-form',
    loadChildren: () => import('./clients/clients-form/clients-form.module').then( m => m.ClientsFormPageModule)
  },
  {
    path: 'clients-list',
    loadChildren: () => import('./clients/clients-list/clients-list.module').then( m => m.ClientsListPageModule)
  },
]; */

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients-list/clients-list.module').then(
        (m) => m.ClientsListPageModule
      ),
  },
  {
    path: 'clients/new',
    loadChildren: () =>
      import('./clients/clients-form/clients-form.module').then(
        (m) => m.ClientsFormPageModule
      ),
  },
  {
    path: 'clients/edit/:id',
    loadChildren: () =>
      import('./clients/clients-form/clients-form.module').then(
        (m) => m.ClientsFormPageModule
      ),
  },
  {
    path: 'equipments/new/:clientId',
    loadChildren: () =>
      import('./clients/equipments-form/equipments-form.module').then(
        (m) => m.EquipmentsFormPageModule
      ),
  },
  {
    path: 'equipments/edit/:id',
    loadChildren: () =>
      import('./clients/equipments-form/equipments-form.module').then(
        (m) => m.EquipmentsFormPageModule
      ),
  },
  {
    path: 'equipments/edit/from-qr-code/:internalId',
    loadChildren: () =>
      import('./clients/equipments-form/equipments-form.module').then(
        (m) => m.EquipmentsFormPageModule
      ),
  },
  {
    path: 'equipments-list',
    loadChildren: () =>
      import('./clients/equipments-list/equipments-list.module').then(
        (m) => m.EquipmentsListPageModule
      ),
  },
  {
    path: 'qrcode-page',
    loadChildren: () =>
      import('./clients/qrcode-page/qrcode-page.module').then(
        (m) => m.QrcodePagePageModule
      ),
  },
  {
    path: 'maintenance/new/:internalEquipmentId',
    loadChildren: () =>
      import('./clients/maintenance-form/maintenance-form.module').then(
        (m) => m.MaintenanceFormPageModule
      ),
  },
  {
    path: 'maintenance/edit/:id',
    loadChildren: () =>
      import('./clients/maintenance-form/maintenance-form.module').then(
        (m) => m.MaintenanceFormPageModule
      ),
  },
  {
    path: 'maintenance-list',
    loadChildren: () =>
      import('./clients/maintenance-list/maintenance-list.module').then(
        (m) => m.MaintenanceListPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
