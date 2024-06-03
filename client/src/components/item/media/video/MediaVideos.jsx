//youtue
import Youtube from "react-youtube";

//import css
import "./mediaVideos.css";

//react-router-dom
import { useSearchParams } from "react-router-dom";

//Movie context
import { useMovies } from "../../../../context/MoviesContext";
import { useSeries } from "../../../../context/SeriesContext";

function MediaVideos() {
  const { movieDetail } = useMovies();
  const { serieDetail } = useSeries();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  const data = type === "series" ? serieDetail : movieDetail;
  const {
    videos: { results },
  } = data;

  const videoItem = results
    .filter((video) => video.type === "Teaser" || "Trailer")
    .slice(0, 1)
    .map((item, index) => (
      <Youtube
        key={index}
        videoId={item.key}
        className="mediaVideos-item"
        loading="lazy"
      />
    ));

  return (
    <article className="mediaVideos">
      <div className="mediaVideos-container">
        {videoItem}
      </div>
    </article>
  );
}

export default MediaVideos;
