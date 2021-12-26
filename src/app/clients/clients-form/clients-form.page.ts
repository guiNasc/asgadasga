import { SQLiteService } from './../../shared/services/sqlite.service';
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
    private toastCtrl: ToastController,
    private sqlite: SQLiteService,
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
    console.log('[this.client]', JSON.stringify(this.client));
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

  async backupDb() {
    const bkp = await this.sqlite.exportDatabase();
    console.log('database', JSON.stringify(bkp));
  }
}
