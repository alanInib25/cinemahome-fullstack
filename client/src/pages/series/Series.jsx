import React, { useEffect } from "react";

//react-router-dom
import { Outlet } from "react-router-dom";

//components
import Genres from "../../components/genres/Genres";
import SortBySelect from "../../components/sortBySelect/SortBySelect";
import Search from "../../components/search/Search";
import BackButton from "../../components/backButton/BackButton";

//context
import { useSeries } from "../../context/SeriesContext";
import { useFetch } from "../../context/FetchContext";

//css
import "./series.css";

function Series() {
  const { seriesGenres, getSeriesGenres, seriesSortByValues, seriesData } = useSeries();
  const { error } = useFetch();

  //cuando se refresca la pagina se recuperan los generos de las series
  useEffect(() => {
    getSeriesGenres();
    window.scroll(0,0)
  }, []);

  return (
    <section className="series">
      <div className="series-top">
        <BackButton />
        {error.message.length > 0 && <span className="message-text">{error.message}</span>}
      </div>
      <div className="series-container">
        <div className="series-options">
          <Search type="series" />
          <SortBySelect type="series" data={seriesSortByValues} />
          <Genres type="series" iterableGenders={seriesGenres} />
        </div>
        <div className="series-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Series;
