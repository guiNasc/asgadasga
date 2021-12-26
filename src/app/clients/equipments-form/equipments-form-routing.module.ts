import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentsFormPage } from './equipments-form.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentsFormPageRoutingModule {}
