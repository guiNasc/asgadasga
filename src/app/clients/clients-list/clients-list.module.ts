import { QrcodePagePageModule } from './../qrcode-page/qrcode-page.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsListPageRoutingModule } from './clients-list-routing.module';

import { ClientsListPage } from './clients-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsListPageRoutingModule,
    QrcodePagePageModule,
  ],
  declarations: [ClientsListPage]
})
export class ClientsListPageModule {}
