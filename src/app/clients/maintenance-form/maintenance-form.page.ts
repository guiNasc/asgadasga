import { MaintenanceService } from './../shared/maintenance.service';
import { Maintenance } from './../shared/maintenance';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.page.html',
  styleUrls: ['./maintenance-form.page.scss'],
})
export class MaintenanceFormPage implements OnInit {
  title: string = 'Nova Manutenção';
  maintenance: Maintenance;
  internalEquipmentId: string;

  constructor(
    private maintenanceService: MaintenanceService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.maintenance = new Maintenance();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.internalEquipmentId = this.route.snapshot.paramMap.get('internalEquipmentId');
    if (idParam) {
      this.title = 'Editar manutenção';
      this.maintenance = await this.maintenanceService.getById(parseInt(idParam));
      console.log(`this.maintenance`, this.maintenance);
    }
  }

  async onSubmit() {
    try {
      this.maintenance.internalEquipmentId = this.internalEquipmentId;

      this.maintenance.madeAt = new Date(this.maintenance.madeAtAsString).getTime();
      this.maintenance.guarantee = new Date(this.maintenance.guaranteeAsString).getTime();

      console.log('[this.maintenance]', this.maintenance);
      const result = await this.maintenanceService.save(this.maintenance);
      const id = this.maintenance.id || result.changes.lastId;
      this.maintenance = await this.maintenanceService.getById(id);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Manutenção salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000,
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu algum problema.',
        color: 'danger',
        position: 'bottom',
        duration: 3000,
      });

      toast.present();
    }
  }
}
