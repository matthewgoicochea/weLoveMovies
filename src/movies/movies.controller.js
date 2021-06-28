const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function read(req, res, next) {
  const movieId = req.params.movieId;
  const data = await service.read(Number(req.params.movieId));
  if (data) {
    return res.json({ data });
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function readReviews(req, res, next) {
  const movieId = req.params.movieId;
  const data = await service.readReviews(Number(req.params.movieId));
  if (data) {
    return res.json({ data });
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function movieExists(req, res, next) {
  const movieId = req.params.movieId;
  const movie = await service.movieExists(movieId);

  if (movie === undefined) {
    next({ status: 404, message: "Movie cannot be found." });
  }
  return next();
}

async function list(req, res) {
  const is_showing = req.query.is_showing;
  const data = is_showing
    ? await service.list(is_showing)
    : await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readReviews: asyncErrorBoundary(readReviews),
};
