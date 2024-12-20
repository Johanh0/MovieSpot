const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const request = require("request");

// Please use your own API key
const API_KEY = process.env.API_KEY;

function getMovies(callback) {
  const url = `https://api.themoviedb.org/3/trending/movie/week?language=en-US`;

  // API options
  const options = {
    url,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    json: true,
  };

  // Calling the API
  request(options, (error, response) => {
    // Handle errors
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.statusCode !== 200) {
      callback("Something went wrong!", undefined);
    } else {
      // Sending the information
      callback(undefined, response);
    }
  });
}

function getMovie(movieSearch, callback) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movieSearch
  )}&include_adult=true&language=en-US&page=1`;

  // API options
  const options = {
    url,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    json: true,
  };

  // Calling the API
  request(options, (error, response) => {
    // Handle errors
    if (error) {
      callback("Unable to connect to services!", undefined);
    } else if (response.statusCode !== 200) {
      callback("Something went wrong!", undefined);
    } else {
      // Sending the information
      callback(undefined, response);
    }
  });
}

function getVideo(movieID, callback) {
  const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`;
  // API options
  const options = {
    url,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    json: true,
  };

  // Calling the API
  request(options, (error, response) => {
    // Handle errors
    if (error) {
      callback("Unable to connect to services!", undefined);
    } else if (response.statusCode !== 200) {
      callback("Something went wrong!", undefined);
    } else {
      // Sending the information
      callback(undefined, response);
    }
  });
}

module.exports = {
  getMovies,
  getMovie,
  getVideo,
};
