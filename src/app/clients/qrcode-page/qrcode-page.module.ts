import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodePagePageRoutingModule } from './qrcode-page-routing.module';

import { QrcodePagePage } from './qrcode-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodePagePageRoutingModule
  ],
  declarations: [QrcodePagePage]
})
export class QrcodePagePageModule {}
