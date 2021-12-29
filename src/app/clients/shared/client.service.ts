import { Client } from './client';
import { SQLiteService } from './../../shared/services/sqlite.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private sqliteService: SQLiteService) {}

  save(client: Client) {
    if (client.id > 0) {
      return this.update(client);
    }

    client.status = 'active';
    return this.insert(client);
  }

  private insert(client: Client) {
    const sql =
      'insert into clients (name,status,email,register_number,cpf, phone, address, internal_id) values (?,?,?,?,?,?,?,?)';
    const data = [
      client.name,
      client.status,
      client.email,
      client.registerNumber,
      client.cpf,
      client.phone,
      client.address,
      uuidv4()
    ];

    return this.sqliteService.doRun(sql, data);
  }

  private update(client: Client) {
    const sql =
      'update clients set name = ?, email = ?, register_number = ?, cpf = ?, phone = ?, address = ? where id = ?';
    const data = [
      client.name,
      client.email,
      client.registerNumber,
      client.cpf,
      client.phone,
      client.address,
      client.id,
    ];
    return this.sqliteService.doRun(sql, data);
  }

  delete(id: number) {
    const sql = 'update clients set status = "inactive" where id = ?';
    const data = [id];
    return this.sqliteService.doRun(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from clients where id = ? and status = "active"';
    const data = [id];
    const result = await this.sqliteService.doQuery(sql, data);
    const clients = this.fill(result.values);
    const client = new Client();

    if (clients.length && clients.length > 0) {
      return clients[0];
    }

    return client;
  }

  async getAll() {
    const sql = 'select * from clients where status = "active" order by name';
    const result = await this.sqliteService.doQuery(sql);
    return this.fill(result.values);
  }

  async filter(text: string) {
    const sql = 'select * from clients where name like ? and status = "active" order by name';
    const data = [`%${text}%`];
    const result = await this.sqliteService.doQuery(sql, data);
    return this.fill(result.values);
  }

  fill(rows: any) {
    const clients: Client[] = [];

    rows.forEach((row) => {
      clients.push(
        Client.build(
          row.id,
          row.name,
          row.email,
          row.cpf,
          row.register_number,
          row.status,
          row.internal_id,
          row.phone,
          row.address,
          row.cnpj,
          row.government_registration,
        )
      );
    });
    return clients;
  }
}
