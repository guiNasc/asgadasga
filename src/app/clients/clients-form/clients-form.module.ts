import { EquipmentsListPageModule } from './../equipments-list/equipments-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsFormPageRoutingModule } from './clients-form-routing.module';

import { ClientsFormPage } from './clients-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsFormPageRoutingModule,
    EquipmentsListPageModule,
  ],
  declarations: [ClientsFormPage]
})
export class ClientsFormPageModule {}
