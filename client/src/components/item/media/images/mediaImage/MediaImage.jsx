import { Link, useSearchParams } from "react-router-dom";

//context
import { useMovies } from "../../../../../context/MoviesContext";
import { useSeries } from "../../../../../context/SeriesContext";

//customer hook
import { useSeeMoreHook } from "../../../../../customHook/useCustomerHook";

//css
import "./mediaImage.css";

//API img request
const API_URL_IMAGEN = import.meta.env.VITE_API_URL_IMAGEN;

function MediaImage() {
  const { movieDetail } = useMovies();
  const { serieDetail } = useSeries();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeSearch = searchParams.get("type");
  const typeImageSearch = searchParams.get("typeImage");
  
  const data = typeSearch === "series" ? serieDetail : movieDetail;
  const { images } = data;
  
  const { dataAmount, showMore, amount } = useSeeMoreHook(images[typeImageSearch]);
  const dataImages = dataAmount.map(
    (item, index) => (
      <Link
        key={index}
        to={`${API_URL_IMAGEN}/${item.file_path}`}
        target="_blank"
      >
        <picture>
          <img src={`${API_URL_IMAGEN}/${item.file_path}`} />
        </picture>
      </Link>
    )
  );

  return (
    <article className="mediaImage">
      <h2 className="mediaImage-typeImage">{typeImageSearch}</h2>
      {!Object.keys(images).length || !Object.values(images[typeImageSearch]).length ? (
        <h3>No Images</h3>
      ) : (
        <>
          <div className="mediaImage-content">{dataImages}</div>
          {images[typeImageSearch].length > amount && (
            <button onClick={showMore} className="see-more-btn">
              more {typeImageSearch}
            </button>
          )}
        </>
      )}
    </article>
  );
}

export default MediaImage;
