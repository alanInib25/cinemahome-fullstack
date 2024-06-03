//context
import { useEffect } from "react";
import { useMovies } from "../../context/MoviesContext";
import { useSeries } from "../../context/SeriesContext";

//components
import SortByOptions from "./sortByOptions/SortByOptions";

//css
import "./sortBySelect.css";

function SortBySelect({ data, type }) {
  const { sortMoviesValue, sortMovies } = useMovies();
  const { sortSeriesValue, sortSeries } = useSeries();

  const optionsValues = data.map((item, index) => {
    return <SortByOptions key={index} item={item}/>
  });

  function handleChange(e) {
    type === "movies"
      ? sortMoviesValue(e.target.value)
      : sortSeriesValue(e.target.value);
  }

  return (
    <div className="sortBySelect">
      <h3>Sort By</h3>
      <select onChange={handleChange} defaultValue={type==="movies" ? sortMovies : sortSeries}>{optionsValues}</select>
    </div>
  );
}

export default SortBySelect;
