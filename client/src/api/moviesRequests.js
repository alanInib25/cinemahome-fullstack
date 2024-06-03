//const ENDPOINT_API = import.meta.env.VITE_ENDPOINT_URL;

const API_MOVIE = import.meta.env.VITE_API_MOVIE;
const API_DISCOVER_MOVIE = import.meta.env.VITE_API_DISCOVER_MOVIE;
const API_MOVIE_POPULAR = import.meta.env.VITE_API_MOVIE_POPULAR;
const API_MOVIE_RATED = import.meta.env.VITE_API_MOVIE_RATED;
const API_MOVIE_SEARCH = import.meta.env.VITE_API_MOVIE_SEARCH;
const API_MOVIES_GENRES = import.meta.env.VITE_API_MOVIES_GENRES;
const API_KEY = import.meta.env.VITE_API_KEY;

//trae pelicula por texto (titulo) ingresado
export const getMoviesForTitleRequest = (title) =>
  new Request(`${API_MOVIE_SEARCH}?api_key=${API_KEY}&query=${title}`, {
    method: "GET",
  });

//trae peliculas populares
export const getMoviesRequest = (page, genreId, sortBy) => {
  const withGenre = genreId ? `&with_genres=${genreId}` : ``;
  return new Request(
    `${API_DISCOVER_MOVIE}?api_key=${API_KEY}&page=${page}${withGenre}&sort_by=${sortBy}`,
    { method: "GET" }
  );
};

//trae peliculas populares para home
export const getMoviesPopularRequest = () =>
  new Request(`${API_MOVIE_POPULAR}?api_key=${API_KEY}`, {
    method: "GET",
  });

//trae peliculas rated para home
export const getMoviesRatedRequest = () =>
  new Request(`${API_MOVIE_RATED}?api_key=${API_KEY}`);

//trae detalle de una pelicula por id
export const getMovieRequest = (id) =>
  new Request(
    `${API_MOVIE}/${id}?api_key=${API_KEY}&append_to_response=external_ids%2Creviews%2Cimages%2Cvideos%2Csimilar%2Ccredits`,
    {
      method: "GET",
    }
  );

//trae los generos de las peliculas
export const getGenresRequest = () =>
  new Request(`${API_MOVIES_GENRES}?api_key=${API_KEY}`, {
    method: "GET",
  });
