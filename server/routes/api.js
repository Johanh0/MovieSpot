const express = require("express");
const router = express.Router();
const moviedb = require("../utils/moviedb");

router.get("/movies", (req, res) => {
  moviedb.getMovies((error, data) => {
    if (error) {
      res.send({ error });
      return;
    }

    res.send(data);
  });
});

router.get("/movie", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a movie name",
    });
    return;
  }

  moviedb.getMovie(req.query.search, (error, data) => {
    if (error) {
      res.send({ error });
      return;
    }

    res.send(data);
  });
});

module.exports = router;
