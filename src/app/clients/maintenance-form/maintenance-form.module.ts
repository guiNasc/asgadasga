import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceFormPageRoutingModule } from './maintenance-form-routing.module';

import { MaintenanceFormPage } from './maintenance-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceFormPageRoutingModule
  ],
  declarations: [MaintenanceFormPage]
})
export class MaintenanceFormPageModule {}
