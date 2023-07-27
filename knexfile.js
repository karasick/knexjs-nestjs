// Update with your config settings.

/**
 * @types { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    debug: false,
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'test',
      port: 5432,
    },
  },
};
