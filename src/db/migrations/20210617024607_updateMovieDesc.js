exports.up = function (knex) {
  return knex.schema.table("movies", (table) => {
    table.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.table("movies", (table) => {
    table.dropColumn("description");
  });
};
