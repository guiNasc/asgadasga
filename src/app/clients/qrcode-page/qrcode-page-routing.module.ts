import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodePagePage } from './qrcode-page.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodePagePageRoutingModule {}
