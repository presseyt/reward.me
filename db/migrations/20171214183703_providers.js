
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('providers', function(table){
      table.increments().primary();
      table.string('name').notNullable();
      table.string('image');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('providers')
  ]);
};
