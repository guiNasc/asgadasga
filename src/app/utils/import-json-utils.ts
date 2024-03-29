export const defaultDb: any = {
  database: 'asga-db',
  version: 1,
  encrypted: false,
  mode: 'full',
  tables: [
    {
      name: 'clients',
      schema: [
        { column: 'id', value: 'INTEGER PRIMARY KEY NOT NULL' },
        { column: 'internal_id', value: 'TEXT' },
        { column: 'name', value: 'TEXT' },
        { column: 'email', value: 'TEXT' },
        { column: 'cpf', value: 'TEXT' },
        { column: 'register_number', value: 'TEXT' },
        { column: 'status', value: 'TEXT' },
        { column: 'phone', value: 'TEXT' },
        { column: 'address', value: 'TEXT' },
        { column: 'cnpj', value: 'TEXT' },
        { column: 'government_registration', value: 'TEXT' },
        { column: 'last_modified', value: "INTEGER DEFAULT (strftime('%s', 'now'))"},
      ],
    },
    {
      name: 'equipments',
      schema: [
        { column: 'id', value: 'INTEGER PRIMARY KEY NOT NULL' },
        { column: 'internal_id', value: 'TEXT' },
        { column: 'internal_client_id', value: 'TEXT' },
        { column: 'name', value: 'TEXT' },
        { column: 'serial_number', value: 'TEXT' },
        { column: 'model', value: 'TEXT' },
        { column: 'producer', value: 'TEXT' },
        { column: 'info', value: 'TEXT' },
        { column: 'last_modified', value: "INTEGER DEFAULT (strftime('%s', 'now'))"},
      ],
    },
    {
      name: 'maintenance',
      schema: [
        { column: 'id', value: 'INTEGER PRIMARY KEY NOT NULL' },
        { column: 'internal_equipment_id', value: 'TEXT' },
        { column: 'professional_related', value: 'TEXT' },
        { column: 'made_at', value: 'INTEGER' },
        { column: 'guarantee', value: 'INTEGER' },
        { column: 'info', value: 'TEXT' },
        { column: 'last_modified', value: "INTEGER DEFAULT (strftime('%s', 'now'))"},
      ],
    },
  ],
};
