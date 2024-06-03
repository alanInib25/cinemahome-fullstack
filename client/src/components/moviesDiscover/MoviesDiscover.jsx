import { useEffect } from "react";

//react-router-dom
import { useSearchParams } from "react-router-dom"

//context
import { useMovies } from "../../context/MoviesContext";

//custom hook
import useInfiniteScrollHook from "../../customHook/useInfiniteScroll";

//components
import DataContent from "../dataContent/DataContent";

function DiscoverMovies() {
  const {
    moviesForTitle,
    getMoviesGenreName,
    getMovies,
    moviesData,
    sortMovies,
  } = useMovies();

  //custom hook
  const { targetToObserver } = useInfiniteScrollHook();

  //searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const genreIdSearchParams = searchParams.get("genreId");

  useEffect(() => {
      getMovies(moviesData.pageData + 1, genreIdSearchParams, sortMovies);
  }, [sortMovies, genreIdSearchParams]);

  useEffect(() => {
    if (moviesData.movies.length) return targetToObserver();
  }, [moviesData]);

  return (
    <>
      <DataContent
        title={
          genreIdSearchParams
            ? getMoviesGenreName(genreIdSearchParams)
            : "Discover all"
        }
        type="movies"
        data={
          moviesForTitle.data.length ? moviesForTitle.data : moviesData?.movies
        }
      />
    </>
  );
}

export default DiscoverMovies;
