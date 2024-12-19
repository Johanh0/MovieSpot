const api = import("/js/api.js");
// HTML Elements
const trendingVideo = document.querySelector(".trending__video");
const trendingList = document.querySelector(".trending__list");

const localStorageData = await (async () => {
  // Try to get data from localStorage
  let data = localStorage.getItem("movies");

  // If there's not data call the API
  if (!data) {
    data = await api.getMovies(true);
  } else {
    // If there's data, parse the string
    data = JSON.parse(data);
  }

  return data.body.results;
})();

document.addEventListener("DOMContentLoaded", async () => {
  // List all the movies saved in localStorage
  localStorageData.forEach((movie) => {
    trendingList.innerHTML += `
    <div class="list--item">
    <div class="list--item__img">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="" />
    </div>
    <div class="list--item__info">
      <div class="list--item__info--title">
        <a href="/">${movie.title}</a>
      </div>
      <div class="list--item__info--details">
        <p>category</p>
        <p>|</p>
        <p>${movie.release_date}</p>
      </div>
    </div>
  </div>
`;
  });

  // Get a random movie and inner to the HTML
  const randomMovie =
    localStorageData[Math.floor(Math.random() * localStorageData.length + 1)];

  // trendingVideo.innerHTML = `
  //   <div class="trending__video--video">
  //     <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieTrailer}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  //     </div>
  //    <div class="trending__video--info">
  //       <a href="">${randomMovie.title}</a>
  //       <p>category</p>
  //   </div>
  // `;
});
