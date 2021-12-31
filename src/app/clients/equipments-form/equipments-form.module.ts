import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentsFormPageRoutingModule } from './equipments-form-routing.module';

import { EquipmentsFormPage } from './equipments-form.page';
import { QrCodeModule } from 'ng-qrcode';
import { MaintenanceListPageModule } from '../maintenance-list/maintenance-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentsFormPageRoutingModule,
    QrCodeModule,
    MaintenanceListPageModule
  ],
  declarations: [EquipmentsFormPage]
})
export class EquipmentsFormPageModule {}
