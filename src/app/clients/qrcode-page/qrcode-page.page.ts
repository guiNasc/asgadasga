import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  SupportedFormat,
} from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qrcode-page',
  templateUrl: './qrcode-page.page.html',
  styleUrls: ['./qrcode-page.page.scss'],
})
export class QrcodePagePage implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    await this.scan();
  }

  async scan() {
    await this.checkPermission();
    await this.startScan();
  }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted;
  }

  async startScan() {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan({
      targetedFormats: [SupportedFormat.QR_CODE],
    });

    if (result.content) {
      await BarcodeScanner.stopScan();
      await BarcodeScanner.showBackground();
      this.router.navigate(['/equipments/edit/from-qr-code/', result.content]);
    }
  }
}
