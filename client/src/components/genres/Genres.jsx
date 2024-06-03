import React from "react";

//react-router-dom
import { NavLink, useSearchParams } from "react-router-dom";

//css
import "./genres.css";

function Genres({ type, iterableGenders }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const genreIdSearch = searchParams.get("genreId");
  const genders = iterableGenders.map(({ id, name }) => {
    return (
      <li key={id}>
        <NavLink
          to={`/${type}?genreId=${id}`}
          key={id}
          className={({ isActive }) =>
            isActive && id === Number(genreIdSearch) ? "genres-navLink-selected" : "genres-navLink"
          }
          end={true}
        >
          {name}
        </NavLink>
      </li>
    );
  });

  return (
    <article className="genres">
      <h3 className="genres-title">genres:</h3>
      <ul className="genres-menu">
        <li>
          <NavLink
            to="."
            className={({ isActive }) =>
              isActive && genreIdSearch === null ? "genres-navLink-selected" : "genres-navLink"
            }
          >
            All
          </NavLink>
        </li>
        {genders}
      </ul>
    </article>
  );
}

export default Genres;
