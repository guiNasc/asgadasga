import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentsListPage } from './equipments-list.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentsListPageRoutingModule {}
