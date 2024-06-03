// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//import css
import "./mediaImages.css";

//context
import { useMovies } from "../../../../context/MoviesContext";
import { useSeries } from "../../../../context/SeriesContext";

//react-router-dom
import { NavLink, Outlet, useSearchParams } from "react-router-dom";

//customer hook
import { useQueryParamsHook } from "../../../../customHook/useCustomerHook";

function MediaImages() {
  const { movieDetail } = useMovies();
  const { serieDetail } = useSeries();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const typeImageFilter = searchParams.get("typeImage");

  const data = type === "series" ? serieDetail : movieDetail;
  const { images } = data;
  const typesImagesKeys = Object.keys(images);

  /*
  genera tipos de imagen (backdrops, logos, poster)
  y la cantidad de imagenes que trae para menu,
  si el tipo de imagen tiene imagenes realiza el item para el menu, 
  si no trae imagenes no se muestra e menu
  */
  const typeImages = typesImagesKeys.map((imageType, index) => {
    const typeImageAmount = images[imageType].length;
    return (
      typeImageAmount > 0 && (
        <NavLink
          key={index}
          to={useQueryParamsHook("typeImage", `${imageType}`)}
          className={({ isActive }) =>
            isActive && imageType === typeImageFilter
              ? "mediaImages-navLink-selected"
              : "mediaImages-navLink"
          }
          end
        >
          {imageType} ({typeImageAmount})
        </NavLink>
      )
    );
  });

  return (
    <article className="mediaImages">
      <nav>
        <ul className="mediaImages-menu">{typeImages}</ul>
      </nav>
      <Outlet />
    </article>
  );
}

export default MediaImages;
