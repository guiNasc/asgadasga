import { ClientService } from './../shared/client.service';
import { Client } from './../shared/client';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
})
export class ClientsListPage implements OnInit {
  clients: Client[] = [];
  constructor(
    private clientService: ClientService,
    private alert: AlertController,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadClients();
  }

  async loadClients() {
    this.clients = await this.clientService.getAll();
  }

  doSearchClear() {
    this.loadClients();
  }

  async doSearchbarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.clients = await this.clientService.filter(value);
    }
  }

  async executeDelete(client: Client) {
    try {
      await this.clientService.delete(client.id);
      const idx = this.clients.indexOf(client);
      this.clients.splice(idx, 1);

      const toast = await this.toast.create({
        header: 'Sucesso',
        message: 'Contato exlu[ido com sucesso.',
        color: 'success',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    } catch (error) {

      const toast = await this.toast.create({
        header: 'Erro',
        message: 'Nao foi possivel excluir o contato.',
        color: 'danger',
        position: `bottom`,
        duration: 3000,
      });

      toast.present();
    }
  }

  async delete(client: Client) {
    const alert = await this.alert.create({
      header: 'Excluir?',
      message: `Deseja excluir o cliente: ${client.name}?`,
      buttons: [
        {
          text: `Cancelar`,
          role: `cancel`,
        },
        {
          text: `Excluir`,
          handler: () => this.executeDelete(client),
        },
      ],
    });
    alert.present();
  }
}