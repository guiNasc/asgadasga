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
        { column: 'last_modified', value: "INTEGER DEFAULT (strftime('%s', 'now'))"},
      ],
    },
  ],
};
