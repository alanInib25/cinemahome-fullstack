//context
import { useMovies } from "../context/MoviesContext";
import { useSeries } from "../context/SeriesContext";

export default function useSearch(type) {
  const { setSearchTitleMovie } = useMovies();
  const { setSearchTitleSerie } = useSeries();

  function searchForTitle(text){
    switch (type) {
      case "series": {
        return text.length >= 3
          ? setSearchTitleSerie(text)
          : setSearchTitleSerie("");
      }
      case "movies": {
        return text.length >= 3
          ? setSearchTitleMovie(text)
          : setSearchTitleMovie("");
      }
      default: {
        break;
      }
    }
  }

  return { searchForTitle }
}
