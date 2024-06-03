//const ENDPOINT_API = import.meta.env.VITE_ENDPOINT_URL;

const API_KEY = import.meta.env.VITE_API_KEY;
const API_DISCOVER_SERIES = import.meta.env.VITE_API_DISCOVER_SERIES;
const API_SERIE_SEARCH = import.meta.env.VITE_API_SERIE_SEARCH;
const API_SERIES_POPULAR = import.meta.env.VITE_API_SERIES_POPULAR;
const API_SERIES_RATED = import.meta.env.VITE_API_SERIES_RATED;
const API_SERIES_GENRES = import.meta.env.VITE_API_SERIES_GENRES;
const API_SERIE = import.meta.env.VITE_API_SERIE;

//trae series por busqueda (title)
export const getSerieForTitleRequest = (title) =>
  new Request(`${API_SERIE_SEARCH}?api_key=${API_KEY}&query=${title}`, {
    method: "GET",
  });

//trae series populares
export const getSeriesRequest = (page, genreId, sortBy) => {
  const withGenre = genreId ? `&with_genres=${genreId}` : ``;
  return new Request(
    `${API_DISCOVER_SERIES}?api_key=${API_KEY}&page=${page}${withGenre}&sort_by=${sortBy}`,
    { method: "GET" }
  );
};

//trae series populares
export const getSeriesPopularRequest = () =>
  new Request(`${API_SERIES_POPULAR}?api_key=${API_KEY}`, { method: "GET" });

//trae series mejor valorados
export const getSeriesRatedRequest = () =>
  new Request(`${API_SERIES_RATED}?api_key=${API_KEY}`, { method: "GET" });

//trae detalle de una serie por id
export const getSerieRequest = (idSerie) =>
  new Request(
    `${API_SERIE}/${idSerie}?api_key=${API_KEY}&append_to_response=external_ids%2Creviews%2Cimages%2Cvideos%2Csimilar%2Ccredits`,
    { method: "GET" }
  );

//trae generos de las series
export const getSeriesGenresRequest = () =>
  new Request(`${API_SERIES_GENRES}?api_key=${API_KEY}`, { method: "GET" });
