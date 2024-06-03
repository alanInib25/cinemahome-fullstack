import { useEffect } from "react";

//import context
import { useMovies } from "../../context/MoviesContext";
import { useSeries } from "../../context/SeriesContext";
import { useFetch } from "../../context/FetchContext";

//react router dom
import { useParams, useSearchParams } from "react-router-dom";

//css
import "./detailItem.css";

//import components
import GeneralInfo from "../../components/item/generalInfo/GeneralInfo";
import Cast from "../../components/item/cast/Cast";
import Multimedia from "../../components/item/media/Multimedia";
import Reviews from "../../components/item/review/Reviews";
import BackButton from "../../components/backButton/BackButton";
import Carrusel from "../../components/carrusel/Carrusel";
import Spinner from "../../components/spinner/Spinner";

function DetailItem() {
  const { id } = useParams();
  const { getMovieDetail, movieDetail, loading } = useMovies();
  const { getSerieDetail, serieDetail } = useSeries();
  const { error } = useFetch();
  const [searchParams, setSearchParams] = useSearchParams();

  //searchParams
  const type = searchParams.get("type");

  useEffect(() => {
    type === "series" ? getSerieDetail(id) : getMovieDetail(id);
    window.scroll(0, 0);
  }, [id]);

  //discriminamos data segun query params TYPE
  const data = type === "series" ? serieDetail : movieDetail;

  return (
    <section className="detailItem">
       <div className="detailItem-top">
        <BackButton />
        {error.message.length > 0 && <span className="message-text">{error.message}</span>}
      </div>
      {loading || !Object.keys(data).length ? (
        <Spinner />
      ) : (
        <>
          <GeneralInfo item={data} type={type} />
          <Cast item={data} />
          <Reviews item={data} />
          <Multimedia item={data} type={type} />
          <Carrusel
            data={data.similar.results}
            title={`${data.title ? data.title : data.name} Similar's`}
            type={type}
          />
        </>
      )}
    </section>
  );
}

export default DetailItem;
