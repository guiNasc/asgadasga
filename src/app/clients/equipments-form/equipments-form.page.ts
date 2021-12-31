import { MaintenanceListPage } from './../maintenance-list/maintenance-list.page';
import { EquipmentService } from './../shared/equipment.service';
import { Equipment } from './../shared/equipment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  @ViewChild(MaintenanceListPage) maintenanceList: MaintenanceListPage;

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private toastCtrl: ToastController,
    private router: Router
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

  ionViewWillEnter() {
    this.maintenanceList.load();
  }

  async presentNotFoundToast() {
    const toast = await this.toastCtrl.create({
      header: 'Erro',
      message: 'Equipamento não encontrado.',
      color: 'danger',
      position: 'top',
      duration: 3000,
    });

    toast.present();
  }

  async loadByInternalId(internalId: string) {
    this.equipment = await this.equipmentService.getByInternalId(internalId);
    if (!this.equipment?.id) {
      await this.presentNotFoundToast();
      this.router.navigate(['/clients']);
    }
  }

  async loadById(id: number) {
    this.equipment = await this.equipmentService.getById(id);
    if (!this.equipment?.id) {
      await this.presentNotFoundToast();
      this.router.navigate(['/clients']);
    }
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
