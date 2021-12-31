import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceFormPage } from './maintenance-form.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceFormPageRoutingModule {}
