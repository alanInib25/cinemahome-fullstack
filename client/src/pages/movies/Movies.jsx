import React, { useEffect } from "react";

//react-router-dom
import { Outlet } from "react-router-dom";

//components
import Genres from "../../components/genres/Genres";
import SortBySelect from "../../components/sortBySelect/SortBySelect";
import Search from "../../components/search/Search";
import BackButton from "../../components/backButton/BackButton";

//context
import { useMovies } from "../../context/MoviesContext";
import { useFetch } from "../../context/FetchContext";

//css
import "./movies.css";

function Movies() {
  const { moviesGenres, getMoviesGenres, moviesSortByValues, moviesData } =
    useMovies();

  const { error } = useFetch();
  /*al recargar pagina recupera estado de los 
  generos de las movies */
  useEffect(() => {
    getMoviesGenres();
    window.scroll(0, 0);
  }, []);

  return (
    <section className="movies">
      <div className="movies-top">
        <BackButton />
        {error.message.length > 0 && (
          <span className="message-text">{error.message}</span>
        )}
      </div>
      <div className="movies-container">
        <div className="movies-options">
          <Search type="movies" />
          <SortBySelect type="movies" data={moviesSortByValues} />
            <Genres type="movies" iterableGenders={moviesGenres} />

        </div>
        <div className="movies-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Movies;
