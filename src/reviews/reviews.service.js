const knex = require("../db/connection");

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId });
}

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .then((result) => result[0]);
}

function update(review) {
  return knex("reviews as r")
    .where({ "r.review_id": review.review_id })
    .update(review, "*")
    .then(() => attachCritics(review));
}

async function attachCritics(review) {
  review.critic = await knex("critics as c")
    .where({
      "c.critic_id": review.critic_id,
    })
    .first();
  return review;
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = { list, read, update, destroy };
