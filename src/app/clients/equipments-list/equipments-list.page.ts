import { MaintenanceService } from './../shared/maintenance.service';
import { Client } from './../shared/client';
import { EquipmentService } from './../shared/equipment.service';
import { Equipment } from './../shared/equipment';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.page.html',
  styleUrls: ['./equipments-list.page.scss'],
})
export class EquipmentsListPage implements OnInit, OnChanges {
  @Input()
  client: any;

  equipments: Equipment[] = [];

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private equipmentService: EquipmentService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {}

  async ngOnChanges(changes: SimpleChanges) {
    this.client = changes.client.currentValue || new Client();
    await this.load();
  }

  async load() {
    if (this.client && this.client.internalId) {
      this.equipments = await this.equipmentService.getAllByClientId(
        this.client.internalId
      );

      Promise.all(
        this.equipments.map(async (e) => {
          const maintenance =
            await this.maintenanceService.getLastByEquipmentId(e.internalId);

          if (maintenance?.id) {
            e.lastMaintenance = new Date(maintenance.madeAt)
              .toLocaleString('pt-BR')
              .split(' ')[0];
          }
          return e;
        })
      );
    }
  }

  async executeDelete(equipment: Equipment) {
    try {
      await this.equipmentService.delete(equipment.id);
      const idx = this.equipments.indexOf(equipment);
      this.equipments.splice(idx, 1);

      const toast = await this.toast.create({
        header: 'Sucesso',
        message: 'Equipamento exluído com sucesso.',
        color: 'success',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    } catch (error) {
      const toast = await this.toast.create({
        header: 'Erro',
        message: 'Não foi possível excluir o equipamento.',
        color: 'danger',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    }
  }

  async delete(equipment: Equipment) {
    const alert = await this.alert.create({
      header: 'Excluir?',
      message: `Deseja excluir o equipamento: ${equipment.name}?`,
      buttons: [
        {
          text: `Cancelar`,
          role: `cancel`,
        },
        {
          text: `Excluir`,
          handler: () => this.executeDelete(equipment),
        },
      ],
    });
    alert.present();
  }
}
