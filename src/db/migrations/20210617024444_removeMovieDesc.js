exports.up = function (knex) {
  return knex.schema.table("movies", (table) => {
    table.dropColumn("description");
  });
};

exports.down = function (knex) {
  return knex.schema.table("movies", (table) => {
    table.string("description");
  });
};
