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
    localStorage.setItem("movieSearch", JSON.stringify(data));
    return data;
  } catch (error) {}
}

async function getVideo(movieID) {
  // try {
  //   const response = await fetch(`/api/movie/video?movie_id=${movieID}`);
  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   console.log(data);
  // } catch (error) {}

  return "Hello";
}

export { getMovies, getMovie, getVideo };
