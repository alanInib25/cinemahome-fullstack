export function moviesReducer(state, { type, payload }) {
  switch (type) {
    case "MOVIES_HOME": {
      const key = Object.keys(payload);
      const value = Object.values(payload)[0];
      return {
        ...state,
        moviesToHome: {
          ...state.moviesToHome,
          [key]: value,
        },
      };
    }
    case "MOVIES_DATA": {
      const { genreIdSearchParams, sortMoviesValue, data, page } = payload;
      const { genreId, sortBy, movies } = state.moviesData;
      if (genreId === genreIdSearchParams && sortBy === sortMoviesValue) {
        return {
          ...state,
          moviesData: {
            movies: [...movies, ...data],
            genreId: genreIdSearchParams,
            sortBy: sortMoviesValue,
            pageData: page,
          },
        };
      } else {
        return {
          ...state,
          moviesData: {
            movies: data,
            genreId: genreIdSearchParams,
            sortBy: sortMoviesValue,
            pageData: 1,
          },
        };
      }
    }
    case "MOVIES_TITLE": {
      return {
        ...state,
        moviesForTitle: {
          data: payload.data,
          page: payload.page,
        },
      };
    }
    case "MOVIES_SORT": {
      return {
        ...state,
        sortMovies: payload,
      };
    }
    case "MOVIES_SEARCH_TITLE": {
      return {
        ...state,
        searchTitleMovie: payload,
      };
    }
    case "MOVIE_DETAIL": {
      return {
        ...state,
        movieDetail: payload,
      };
    }
    case "MOVIES_GENRES": {
      return {
        ...state,
        moviesGenres: payload,
      };
    }
    default: {
      break;
    }
  }
}
