import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

//import api
import {
  getMovieRequest,
  getMoviesPopularRequest,
  getMoviesRatedRequest,
  getMoviesForTitleRequest,
  getMoviesRequest,
  getGenresRequest,
} from "../api/moviesRequests.js";

//context
import { useFetch } from "./FetchContext.jsx";
//reducer
import { moviesReducer } from "../reducers/moviesReducer.js";

//crea contexto
export const MoviesContext = createContext();

//use seguro de este contxto
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context)
    throw new Error("useMovies must be used within a MoviesProviders");
  return context;
};

//parametros para oredenar movies
const moviesSortByValues = [
  { id: 1, name: "Popularity Descending", value: "popularity.desc" },
  { id: 2, name: "Popularity Ascending", value: "popularity.asc" },
  { id: 3, name: "Revenue Descending", value: "revenue.desc" },
  { id: 4, name: "Revenue Ascending", value: "revenue.asc" },
  { id: 5, name: "Vote Count Descending", value: "vote_count.desc" },
  { id: 6, name: "Vote Count Ascending", value: "vote_count.asc" },
  { id: 7, name: "Title Descending", value: "title.desc" },
  { id: 8, name: "Title Ascending", value: "title.asc" },
];

//initial state
const initialStateMovies = {
  moviesToHome: {
    popular: [],
    rated: [],
  },
  moviesData: {
    movies: [],
    genreId: null,
    sortBy: null,
    pageData: 0,
  },
  moviesForTitle: {
    data: [],
    page: 1,
  },
  sortMovies: "popularity.desc",
  searchTitleMovie: "",
  movieDetail: {},
  moviesGenres: [],
};

export function MoviesProviders({ children }) {
  const [state, dispatch] = useReducer(moviesReducer, initialStateMovies);
  //contexto
  const { fetchData } = useFetch();

  //busca data por titulo ingresado
  useEffect(() => {
    !state.searchTitleMovie.length
      ? dispatch({ type: "MOVIES_TITLE", payload: { data: [], page: 1 } })
      : getMoviesForTitle(state.searchTitleMovie);
  }, [state?.searchTitleMovie]);

  //obtiene pelicula por titulo ingresado (filtro)
  function getMoviesForTitle(title) {
    fetchData(getMoviesForTitleRequest(title), { method: "GET" }).then(
      ({ results, page }) =>
        dispatch({
          type: "MOVIES_TITLE",
          payload: {
            data: results,
            page,
          },
        })
    );
  }

  //setea estado de orden de movies
  function sortMoviesValue(value) {
    return dispatch({ type: "MOVIES_SORT", payload: value });
  }

  //obtiene peliculas discover
  function getMovies(pageReq, genreIdSearchParams, sortMoviesValue) {
    fetchData(
      getMoviesRequest(pageReq, genreIdSearchParams, sortMoviesValue)
    ).then(({ results, page }) => {
      dispatch({
        type: "MOVIES_DATA",
        payload: {
          data: results,
          page,
          genreIdSearchParams,
          sortMoviesValue,
        },
      });
    });
  }

  //obtiene peliculas popular para home
  function getMoviesPopular() {
    fetchData(getMoviesPopularRequest()).then(({ results }) =>
      dispatch({ type: "MOVIES_HOME", payload: { popular: results } })
    );
  }

  //obtiene peliculas rated para home
  function getMoviesRated() {
    fetchData(getMoviesRatedRequest()).then(({ results }) =>
      dispatch({ type: "MOVIES_HOME", payload: { rated: results } })
    );
  }

  //obtiene detalle de una pelicula
  function getMovieDetail(id) {
    fetchData(getMovieRequest(id)).then((data) =>
      dispatch({ type: "MOVIE_DETAIL", payload: data })
    );
  }

  //obtiene generos de peliculas
  function getMoviesGenres() {
    fetchData(getGenresRequest()).then(({ genres }) =>
      dispatch({ type: "MOVIES_GENRES", payload: genres })
    );
  }

  //toma y envia el nombre de un genre
  function getMoviesGenreName(genreId) {
    if (state.moviesGenres.length)
      return state.moviesGenres.find((genre) => genre.id === Number(genreId))
        .name;
  }

  //set search for title
  function setSearchTitleMovie(text) {
    dispatch({ type: "MOVIES_SEARCH_TITLE", payload: text });
  }

  return (
    <MoviesContext.Provider
      value={{
        ...state,
        moviesSortByValues,
        sortMoviesValue,
        getMoviesPopular,
        getMoviesRated,
        getMovies,
        getMovieDetail,
        getMoviesGenreName,
        getMoviesGenres,
        getMoviesForTitle,
        setSearchTitleMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
