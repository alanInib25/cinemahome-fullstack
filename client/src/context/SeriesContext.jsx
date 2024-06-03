import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";

//API
import {
  getSerieForTitleRequest,
  getSeriesRequest,
  getSeriesPopularRequest,
  getSeriesRatedRequest,
  getSerieRequest,
  getSeriesGenresRequest,
} from "../api/seriesRequest.js";

//reducer
import { seriesReducer } from "../reducers/seriesReducer.js";

//contexto
import { useFetch } from "../context/FetchContext";

//crea context
export const SeriesContext = createContext();

//uso segur de contexto
export const useSeries = () => {
  const context = useContext(SeriesContext);
  if (!context)
    throw new Error("useSeries must be used within a SeriesProviders");
  return context;
};

//parametros para oredenar series
const seriesSortByValues = [
  { id: 1, name: "Popularity Descending", value: "popularity.desc" },
  { id: 2, name: "Popularity Ascending", value: "popularity.asc" },
  { id: 3, name: "First Air Date Descending", value: "first_air_date.desc" },
  { id: 4, name: "First Air Date Ascending", value: "first_air_date.asc" },
  { id: 5, name: "Vote Avegare Descending", value: "vote_average.desc" },
  { id: 6, name: "Vote Avegare Ascending", value: "vote_average.asc" },
  { id: 7, name: "Name Descending", value: "name.desc" },
  { id: 8, name: "Name Ascending", value: "name.asc" },
];

const initialStateSeries = {
  seriesToHome: {
    popular: [],
    rated: [],
  },
  seriesData: {
    series: [],
    genreId: null,
    sortBy: null,
    pageData: 0,
  },
  seriesForTitle: {
    data: [],
    page: 1,
  },
  sortSeries: "popularity.desc",
  searchTitleSerie:"",
  serieDetail:{},
  seriesGenres:[],
};
export function SeriesProvides({ children }) {
  const [state, dispatch] = useReducer(seriesReducer, initialStateSeries);
  /* const [seriesGenres, setSeriesGenres] = useState([]); */

  //contexto
  const { fetchData } = useFetch();

  //busca data por titulo ingresado
  useEffect(() => {
    !state.searchTitleSerie.length
      ? dispatch({ type: "SERIES_TITLE", payload: { data: [], page: 1 } })
      : getSeriesForTitle(state.searchTitleSerie);
  }, [state?.searchTitleSerie]);

  //obtiene series por filtro de titulo
  async function getSeriesForTitle(title) {
    fetchData(getSerieForTitleRequest(title)).then(({ results, page }) =>
      dispatch({ type: "SERIES_TITLE", payload: { data: results, page } })
    );
  }

  //setea estado de orden de seires
  function sortSeriesValue(value) {
    return dispatch({ type: "SERIES_SORT", payload: value });
  }

  //obtiene series discover
  function getSeries(pageReq, genreIdSearchParams, sortSerieValue) {
    fetchData(
      getSeriesRequest(pageReq, genreIdSearchParams, sortSerieValue)
    ).then(({ results, page }) => {
      dispatch({
        type: "SERIES_DATA",
        payload: {
          data: results,
          genreIdSearchParams,
          sortSerieValue,
          page,
        },
      });
    });
  }

  //obtiene series populares
  async function getSeriesPopular() {
    fetchData(getSeriesPopularRequest()).then(({ results }) =>
      dispatch({ type: "SERIES_HOME", payload: { popular: results } })
    );
  }

  //obtiene series clsificacion
  async function getSeriesRated() {
    fetchData(getSeriesRatedRequest()).then(({ results }) =>
      dispatch({ type: "SERIES_HOME", payload: { rated: results } })
    );
  }

  //obtiene generos de las series
  async function getSeriesGenres() {
    fetchData(getSeriesGenresRequest()).then(({ genres }) =>
      dispatch({ type: "SERIES_GENRES", payload: genres})
    );
  }

  //obtiene una serie
  async function getSerieDetail(id) {
    fetchData(getSerieRequest(id)).then((data) =>
      dispatch({ type: "SERIE_DETAIL", payload: data})
    );
  }

  //obtiene nombre de genero
  function getSeriesGenreName(genreId) {
    if (!state.seriesGenres.length) return;
    return state.seriesGenres.find((genre) => genre.id === Number(genreId)).name;
  }

  //setea titulo para buscar serie
  function setSearchTitleSerie(title){
    return dispatch({ type: "SERIES_SEARCH_TITLE", payload: title})
  }

  return (
    <SeriesContext.Provider
      value={{
        ...state,
        seriesSortByValues,
        setSearchTitleSerie,
        sortSeriesValue,
        getSeries,
        getSerieDetail,
        getSeriesPopular,
        getSeriesRated,
        getSeriesGenres,
        getSeriesGenreName,
        getSeriesForTitle,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}
