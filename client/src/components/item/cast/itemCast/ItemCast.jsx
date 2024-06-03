//see images api
const API_URL_IMAGEN = import.meta.env.VITE_API_URL_IMAGEN;

//react-router-dom
import { Link } from "react-router-dom";

//Components
import AvatarComp from "../../../AvatarComp";

//css
import "./itemCast.css"

function ItemCast({ cast }) {
  return (
    <Link to={`/detail-people/${cast.id}?type=people`}>
      <div className="itemCast">
        {cast.poster_path === null || cast.profile_path === null ? (
          <AvatarComp name={`${cast.name}`} className="itemCast-avatar" />
        ) : (
          <img
            src={`${API_URL_IMAGEN}/${
              cast.poster_path ? cast.poster_path : cast.profile_path
            }`}
            className="itemCast-image"
          />
        )}
        <div className="itemCast-info">
          <p className="itemCast-name">{cast.name}</p>
          <p className="itemCast-character">{cast.character}</p>
          <p className="itemCast-known">{cast.known_for_department}</p>
        </div>
      </div>
    </Link>
  );
}

export default ItemCast;
