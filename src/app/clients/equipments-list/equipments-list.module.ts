import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentsListPageRoutingModule } from './equipments-list-routing.module';

import { EquipmentsListPage } from './equipments-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentsListPageRoutingModule
  ],
  declarations: [EquipmentsListPage],
  exports: [EquipmentsListPage],
})
export class EquipmentsListPageModule {}
