const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .select("m.*")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id");
  }
  return knex("movies").select("*");
}

function movieExists(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId });
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .then((result) => result[0]);
}

const reduceCritics = reduceProperties("review_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((data) => reduceCritics(data));
}

module.exports = {
  list,
  read,
  readReviews,
  movieExists,
};
