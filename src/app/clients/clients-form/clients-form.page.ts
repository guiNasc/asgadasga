import { ClientService } from './../shared/client.service';
import { Client } from './../shared/client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.page.html',
  styleUrls: ['./clients-form.page.scss'],
})
export class ClientsFormPage implements OnInit {
  title: string = 'Novo Cliente';
  client: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.client = new Client();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar cliente';
      this.loadClient(parseInt(idParam));
    }
  }

  async loadClient(id: number) {
    this.client = await this.clientService.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.clientService.save(this.client);
      this.client.id = result.changes.lastId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Cliente salvo com sucesso.',
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
