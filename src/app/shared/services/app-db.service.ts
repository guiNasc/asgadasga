import { Injectable } from '@angular/core';
import { defaultDb } from '../../utils/import-json-utils';
import {SQLiteService} from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class AppDbService {

  constructor(private sqliteService: SQLiteService) { }


  async createDataBase() {
    //this.sqliteService.
  }
}
