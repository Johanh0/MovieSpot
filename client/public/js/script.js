const localStorageData = await (async () => {
  // Try to get data from localStorage
  let data = localStorage.getItem("movies");

  // If there's not data call the API
  if (!data) {
    data = await getMovies(true); // Llamar a getMovies para obtener los datos
  } else {
    // If there's data, parse the string
    data = JSON.parse(data);
  }

  return data;
})();

console.log(localStorageData);

async function getMovies(isSaved) {
  try {
    // Call the API
    const response = await fetch(`/api/movies`);

    // Check if the call was successful
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    // Optional conditional to save the data in localStorage
    if (isSaved) {
      localStorage.setItem("movies", JSON.stringify(data));
    }

    return data;
  } catch (error) {}
}

async function getMovie(movieSearch) {
  try {
    const response = await fetch(`/api/movie?search=${movieSearch}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    if (localStorageSetting.isSaved) {
      localStorage.setItem("movies", data);
    }
  } catch (error) {}
}
