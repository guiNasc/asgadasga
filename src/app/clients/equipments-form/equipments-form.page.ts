import { EquipmentService } from './../shared/equipment.service';
import { Equipment } from './../shared/equipment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-equipments-form',
  templateUrl: './equipments-form.page.html',
  styleUrls: ['./equipments-form.page.scss'],
})
export class EquipmentsFormPage implements OnInit {
  title: string = 'Novo Equipamento';
  equipment: Equipment;
  clientId: string;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.equipment = new Equipment();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.clientId = this.route.snapshot.paramMap.get('clientId');
    if (idParam) {
      this.title = 'Editar equipamento';
      await this.loadById(parseInt(idParam));
    }

    const internalId = this.route.snapshot.paramMap.get('internalId');
    if (internalId) {
      await this.loadByInternalId(internalId);
    }
  }

  async loadByInternalId(internalId: string) {
    this.equipment = await this.equipmentService.getByInternalId(internalId);
  }

  async loadById(id: number) {
    this.equipment = await this.equipmentService.getById(id);
  }

  async onSubmit() {
    try {
      this.equipment.internalClientId = this.clientId;
      const result = await this.equipmentService.save(this.equipment);
      const id = this.equipment.id || result.changes.lastId;
      this.equipment = await this.equipmentService.getById(id);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Equipamento salvo com sucesso.',
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
