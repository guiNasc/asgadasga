import { Equipment } from './equipment';
import { SQLiteService } from './../../shared/services/sqlite.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private sqliteService: SQLiteService) {}

  save(equipment: Equipment) {
    if (equipment.id > 0) {
      return this.update(equipment);
    }

    return this.insert(equipment);
  }

  private insert(equipment: Equipment) {
    const sql =
      'insert into equipments (name,model,info,internal_client_id,internal_id, producer, serial_number) values (?,?,?,?,?,?,?)';
    const data = [
      equipment.name,
      equipment.model,
      equipment.info,
      equipment.internalClientId,
      uuidv4(),
      equipment.producer,
      equipment.serialNumber,
    ];

    return this.sqliteService.doRun(sql, data);
  }

  private update(equipment: Equipment) {
    const sql =
      'update equipments set name = ?, model = ?, info = ?, producer = ?, serial_number = ? where id = ?';
    const data = [
      equipment.name,
      equipment.model,
      equipment.info,
      equipment.producer,
      equipment.serialNumber,
      equipment.id,
    ];
    return this.sqliteService.doRun(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from equipments where id = ?';
    const data = [id];
    return this.sqliteService.doRun(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from equipments where id = ?';
    const data = [id];
    const result = await this.sqliteService.doQuery(sql, data);
    const equipments = this.fill(result.values);
    const equipment = new Equipment();

    if (equipments.length && equipments.length > 0) {
      return equipments[0];
    }

    return equipment;
  }

  async getAllByClientId(internalClientId: string) {
    const sql =
      'select * from equipments where internal_client_id = ? order by name';
    const data = [internalClientId];
    const result = await this.sqliteService.doQuery(sql, data);
    return this.fill(result.values);
  }

  async getByInternalId(internalId: string) {
    const sql = 'select * from equipments where internal_id = ?';
    const data = [internalId];
    const result = await this.sqliteService.doQuery(sql, data);
    const equipments = this.fill(result.values);
    const equipment = new Equipment();

    if (equipments.length && equipments.length > 0) {
      return equipments[0];
    }

    return equipment;
  }

  fill(rows: any) {
    const equipments: Equipment[] = [];

    rows.forEach((row) => {
      equipments.push(
        Equipment.build(
          row.id,
          row.name,
          row.internal_id,
          row.internal_client_id,
          row.serial_number,
          row.model,
          row.producer,
          row.info
        )
      );
    });
    return equipments;
  }
}
