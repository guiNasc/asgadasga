import { Maintenance } from './maintenance';
import { SQLiteService } from './../../shared/services/sqlite.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private sqliteService: SQLiteService) {}

  save(maintenance: Maintenance) {
    if (maintenance.id > 0) {
      return this.update(maintenance);
    }

    return this.insert(maintenance);
  }

  private insert(maintenance: Maintenance) {
    const sql = `insert into maintenance
      (internal_equipment_id, professional_related, made_at, guarantee, info)
      values (?,?,?,?,?)`;
    const data = [
      maintenance.internalEquipmentId,
      maintenance.professionalRelated,
      maintenance.madeAt,
      maintenance.guarantee,
      maintenance.info,
    ];

    return this.sqliteService.doRun(sql, data);
  }

  private update(maintenance: Maintenance) {
    const sql = `update maintenance set
      professional_related = ?,
      made_at = ?,
      guarantee = ?,
      info = ?
      where id = ?`;
    const data = [
      maintenance.professionalRelated,
      maintenance.madeAt,
      maintenance.guarantee,
      maintenance.info,
      maintenance.id,
    ];
    return this.sqliteService.doRun(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from maintenance where id = ?';
    const data = [id];
    return this.sqliteService.doRun(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from maintenance where id = ?';
    const data = [id];
    const result = await this.sqliteService.doQuery(sql, data);
    const maintenances = this.fill(result.values);
    const maintenance = new Maintenance();

    if (maintenances.length && maintenances.length > 0) {
      return maintenances[0];
    }
    return maintenance;
  }

  async getAllByEquipmentId(internalEquipmentId: string) {
    const sql =
      'select * from maintenance where internal_equipment_id = ? order by made_at desc';
    const data = [internalEquipmentId];
    const result = await this.sqliteService.doQuery(sql, data);
    return this.fill(result.values);
  }

  async getLastByEquipmentId(internalEquipmentId: string) {
    const sql =
      'select *, max(made_at) from maintenance where internal_equipment_id = ?';
    const data = [internalEquipmentId];
    const result = await this.sqliteService.doQuery(sql, data);
    const maintenances = this.fill(result.values);
    const maintenance = new Maintenance();

    if (maintenances.length && maintenances.length > 0) {
      return maintenances[0];
    }
    return maintenance;
  }

  fill(rows: any) {
    const maintenances: Maintenance[] = [];

    rows.forEach((row) => {
      maintenances.push(
        Maintenance.build(
          row.id,
          row.internal_equipment_id,
          row.professional_related,
          row.made_at,
          row.guarantee,
          row.info
        )
      );
    });
    return maintenances;
  }
}
