//react-router-dom
import { Link } from "react-router-dom";

//css
import "./infoGenres.css";

function InfoGeneres({ data, type }) {
  return (
    <ul className="InfoGeneres">
      {data.genres.map((genre) => (
        <li key={genre.id}>
          <Link
            to={`/movies?genreId=${genre.id}`}
            className="genres-name"
          >
            {genre.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default InfoGeneres;
