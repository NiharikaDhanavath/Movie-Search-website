const API_KEY = '16715f78d19059e398af0babef1ffa1b'; 
const API_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchBox = document.getElementById('search-box');
const moviesContainer = document.getElementById('movies-container');

// Fetch movies based on search query
async function fetchMovies(query) {
  const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  return data.results;
}

// Display movies in the UI
function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  if (movies.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found. Try a different search.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imagePath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

    movieElement.innerHTML = `
      <img src="${imagePath}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
    `;

    moviesContainer.appendChild(movieElement);
  });
}

// Event listener for search box
searchBox.addEventListener('keyup', async (event) => {
  const query = event.target.value.trim();
  if (query.length > 0) {
    const movies = await fetchMovies(query);
    displayMovies(movies);
  } else {
    moviesContainer.innerHTML = '';
  }
});
