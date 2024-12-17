const express = require("express");
const router = express.Router();
const getMovies = require("../utils/getMovies");

router.get("/movie", (req, res) => {
  if (!req.query.movie_name) {
    res.send({
      error: "You must provide a movie name",
    });
    return;
  }

  getMovies(req.query.movie_name, (error, data) => {
    if (error) {
      res.send({ error });
      return;
    }

    res.send(data);
  });
});

module.exports = router;
