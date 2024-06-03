import { useEffect } from "react";

//import context
import { useMovies } from "../../context/MoviesContext";
import { useSeries } from "../../context/SeriesContext";
import { useFetch } from "../../context/FetchContext";

//react-router-dom
import { Link } from "react-router-dom";

//components
import DashboardContent from "../../components/dashboardContent/DashboardContent";
import Spinner from "../../components/spinner/Spinner";

//css
import "./dashboard.css";

export default function Home() {
  const { getMoviesPopular, getMoviesRated, moviesToHome } = useMovies();
  const { getSeriesPopular, getSeriesRated, seriesToHome } = useSeries();
  const { loading, error } = useFetch();

  useEffect(() => {
    window.Promise.all([
      getMoviesPopular(),
      getMoviesRated(),
      getSeriesPopular(),
      getSeriesRated(),
    ]);
  }, []);

  return (
    <section>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <article className="dashboard-content">
            {error.message.length > 0 && <span className="message-text">{error.message}</span>}
            <Link to={`/movies`} className="dashboard-link">
              Discover Movies
            </Link>
            {Object.entries(moviesToHome).map((data, index) => (
              <DashboardContent key={index} data={data} type="movies" />
            ))}
          </article>
          <article className="dashboard-content">
            <Link to={`/series`} className="dashboard-link">
              Discover Series
            </Link>
            {Object.entries(seriesToHome).map((data, index) => (
              <DashboardContent key={index} data={data} type="series" />
            ))}
          </article>
        </>
      )}
    </section>
  );
}
