import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceListPageRoutingModule } from './maintenance-list-routing.module';

import { MaintenanceListPage } from './maintenance-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceListPageRoutingModule
  ],
  declarations: [MaintenanceListPage],
  exports: [MaintenanceListPage],
})
export class MaintenanceListPageModule {}
