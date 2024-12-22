// HTML Elements
const formElement = document.querySelector(".form");
const searchInput = document.querySelector("#search__input");
const selectGenres = document.querySelector("#select__genres");
const searchContainer = document.querySelector(".search--container ");
const trendingVideoElement = document.querySelector(".trending__video");
const trendingListElement = document.querySelector(".trending__list");

async function getMovies() {
  try {
    // Call the API
    const response = await fetch(`/api/movies`);

    // Check if the call was successful
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return data.body;
  } catch (error) {
    console.error("Something went wrong");
  }
}

async function getMovie(movieSearch) {
  try {
    const response = await fetch(`/api/movie?search=${movieSearch}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong");
  }
}

async function getVideo(movieID) {
  try {
    const response = await fetch(`/api/movie/video?movie_id=${movieID}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.body;
  } catch (error) {}
}

async function getGenres() {
  try {
    let genresList = localStorage.getItem("genres");
    if (genresList) {
      return JSON.parse(genresList);
    } else {
      const response = await fetch(`/api/movies/genres`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("genres", JSON.stringify(data.body));
      return data.body;
    }
  } catch (error) {}
}

// Generate the first trending movies on the page as soon the DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
  const allMovies = await getMovies();

  // Get the genres
  const genresList = await getGenres();

  allMovies.results.forEach((movie) => {
    // Get genre index
    const genreIndex = genresList.genres.findIndex(
      (genreObj) => genreObj.id === movie.genre_ids[0]
    );
    // Get genre name
    const genre = genresList.genres[genreIndex].name;
    trendingListElement.innerHTML += `
      <div class="list--item">
      <div class="list--item__img">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="" />
      </div>
      <div class="list--item__info">
        <div class="list--item__info--title">
          <p class="title">${movie.title}</p>
        </div>
        <div class="list--item__info--details">
          <p>${genre}</p>
          <p>|</p>
          <p>${movie.release_date}</p>
        </div>
        <div class="list--item__info--description">
          <p>${movie.overview}</p>
        </div>
      </div>
    </div>
  `;
  });

  // Get a random movie and inner to the HTML
  const randomMovie =
    allMovies.results[Math.floor(Math.random() * allMovies.results.length + 1)];
  const movieTrailer = await getVideo(randomMovie.id);
  trendingVideoElement.innerHTML = `
    <div class="trending__video--video">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieTrailer.results[0].key}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
     <div class="trending__video--info">
        <p class="title">${randomMovie.title}</p>
        <p>${randomMovie.media_type}</p>
        <p class="description">${randomMovie.overview}</p>
    </div>
  `;
});

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = searchInput.value;
  const searchMovie = await getMovie(searchInput.value);

  // Morgan's IDEA, please don't ask - it's a little easter egg.
  if (inputValue === "Legally Blonde") {
    document.querySelector(".search").style.backgroundColor = "hotpink";
  } else {
    document.querySelector(".search").style.backgroundColor = "white";
  }

  const genresList = await getGenres();

  // Clean the movies result
  searchContainer.innerHTML = "";

  // If genre select value is not empty
  if (selectGenres.value.length !== 0) {
    // Make a for each of the movies
    searchMovie.body.results.forEach((movie) => {
      // If the movie and select ids are equal
      if (movie.genre_ids[0] === parseInt(selectGenres.value)) {
        // Get genre index
        let genreIndex = genresList.genres.findIndex(
          (genreObj) => genreObj.id === movie.genre_ids[0]
        );
        // Get genre name
        const genre = genresList.genres[genreIndex].name;
        searchContainer.innerHTML += `
        <div class="list--item">
      <div class="list--item__img">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="" />
      </div>
      <div class="list--item__info">
        <div class="list--item__info--title">
          <p class="title">${movie.title}</a>
        </div>
        <div class="list--item__info--details">
          <p>${genre}</p>
          <p>|</p>
          <p>${movie.release_date}</p>
        </div>
        <div class="list--item__info--description">
          <p>${movie.overview}</p>
        </div>
      </div>
    </div>
  `;
      }
    });
    return;
  }

  // Generate all the movies that match
  searchMovie.body.results.forEach((movie) => {
    // Get genre index
    let genreIndex = genresList.genres.findIndex(
      (genreObj) => genreObj.id === movie.genre_ids[0]
    );

    let genre;
    try {
      genre = genresList.genres[genreIndex].name;
    } catch {
      genre = "Non-gender-specific";
    }

    searchContainer.innerHTML += `
        <div class="list--item">
      <div class="list--item__img">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="" />
      </div>
      <div class="list--item__info">
        <div class="list--item__info--title">
          <p class="title">${movie.title}</a>
        </div>
        <div class="list--item__info--details">
          <p>${genre}</p>
          <p>|</p>
          <p>${movie.release_date}</p>
        </div>
        <div class="list--item__info--description">
          <p>${movie.overview}</p>
        </div>
      </div>
    </div>
  `;
  });
});
