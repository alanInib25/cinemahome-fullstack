export const seriesReducer = (state, { type, payload }) => {
  switch (type) {
    case "SERIES_HOME": {
      const key = Object.keys(payload);
      const value = Object.values(payload)[0];
      return {
        ...state,
        seriesToHome: {
          ...state.seriesToHome,
          [key]: value,
        },
      };
    }
    case "SERIES_DATA": {
      const { data, genreIdSearchParams, sortSerieValue, page } = payload;
      const { genreId, sortBy, series } = state.seriesData;
      if (genreId === genreIdSearchParams && sortBy === sortSerieValue) {
        return {
          ...state,
          seriesData: {
            series: [...series, ...data],
            genreId: genreIdSearchParams,
            sortBy: sortSerieValue,
            pageData: page,
          },
        };
      } else {
        return {
          ...state,
          seriesData: {
            series: data,
            genreId: genreIdSearchParams,
            sortBy: sortSerieValue,
            pageData: 1,
          },
        };
      }
    }
    case "SERIES_TITLE": {
      return {
        ...state,
        seriesForTitle: {
          data: payload.data,
          page: payload.page,
        },
      };
    }
    case "SERIES_SORT": {
      return {
        ...state,
        sortSeries: payload,
      };
    }
    case "SERIES_SEARCH_TITLE": {
      return {
        ...state,
        searchTitleSerie: payload,
      };
    }
    case "SERIE_DETAIL": {
      return {
        ...state,
        serieDetail: payload,
      };
    }
    case "SERIES_GENRES": {
      return {
        ...state,
        seriesGenres: payload
      };
    }
    default: {
      break;
    }
  }
};
