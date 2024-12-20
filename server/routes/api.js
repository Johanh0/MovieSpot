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

router.get("/movies/genre", (req, res) => {
  moviedb.getGenres((error, data) => {
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

router.get("/movie/video", (req, res) => {
  if (!req.query.movie_id) {
    res.send({
      error: "You must provide a movie name",
    });
    return;
  }

  moviedb.getVideo(req.query.movie_id, (error, data) => {
    if (error) {
      res.send({ error });
      return;
    }

    res.send(data);
  });
});

router.get("/movie/:id", (req, res) => {
  res.send({
    message: "From the /movie/:id",
    id: req.params.id,
  });
});

module.exports = router;
