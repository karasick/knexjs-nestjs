/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('carbmee_users', function (table) {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('department_id').unsigned().notNullable();

    table.foreign('department_id').references('id').inTable('departments');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('carbmee_users');
};
