import { Equipment } from './../shared/equipment';
import { MaintenanceService } from './../shared/maintenance.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Maintenance } from '../shared/maintenance';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.page.html',
  styleUrls: ['./maintenance-list.page.scss'],
})
export class MaintenanceListPage implements OnInit, OnChanges {
  @Input()
  equipment: any;

  maintenances: Maintenance[] = [];

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {}

  async ngOnChanges(changes: SimpleChanges) {
    this.equipment = changes.equipment.currentValue || new Equipment();
    await this.load();
  }

  async load() {
    if (this.equipment && this.equipment.internalId) {
      this.maintenances = await this.maintenanceService.getAllByEquipmentId(
        this.equipment.internalId
      );
    }
  }

  async executeDelete(maintenance: Maintenance) {
    try {
      await this.maintenanceService.delete(maintenance.id);
      const idx = this.maintenances.indexOf(maintenance);
      this.maintenances.splice(idx, 1);

      const toast = await this.toast.create({
        header: 'Sucesso',
        message: 'Manutenção exluída com sucesso.',
        color: 'success',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    } catch (error) {
      const toast = await this.toast.create({
        header: 'Erro',
        message: 'Não foi possível excluir a manutenção.',
        color: 'danger',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    }
  }

  async delete(maintenance: Maintenance) {
    const alert = await this.alert.create({
      header: 'Excluir?',
      message: `Deseja excluir a manutenção?`,
      buttons: [
        {
          text: `Cancelar`,
          role: `cancel`,
        },
        {
          text: `Excluir`,
          handler: () => this.executeDelete(maintenance),
        },
      ],
    });
    alert.present();
  }

  formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString('pt-BR').split(` `)[0];
  }
}
