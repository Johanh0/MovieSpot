require("dotenv").config({ path: "../.env" });
const chalk = require("chalk");
const request = require("request");
const API_KEY = process.env.API_KEY;

function getMovies(movie, callback) {
  const url = `https://api.themoviedb.org/3/${API_KEY}/search/movie?query=${encodeURIComponent(
    movie
  )}&include_adult=false&language=en-US&page=1`;

  console.log(url);

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.statusCode !== 200) {
      callback("Something went wrong!", undefined);
    } else {
      callback(undefined, response);
    }
  });
}

module.exports = getMovies;
