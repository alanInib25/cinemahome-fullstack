//reac-router-dom
import { NavLink, Outlet } from "react-router-dom";

//css
import "./multimedia.css";

function Multimedia({ item, type }) {
  const typeImages = Object.keys(item.images); //[backdrops, logos, poster]
  const typeImagesValues = Object.values(item.images);
  const typeVideoValues = Object.values(item.videos);

  //valida si tiene imagen y de que tipo
  const typeImage =
    item.images[typeImages[0]].length > 0
      ? typeImages[0]
      : item.images[typeImages[1]].length > 0
      ? typeImages[1]
      : item.images[typeImages[2]].length > 0
      ? typeImages[2]
      : false;

  //cantidad de imagenes en total
  const imagesAmount = typeImagesValues.reduce((acc, i) => acc + i.length, 0);
  return (
    <article className="multimedia">
      <h2>{`${item.title ? item.title : item.name} Media `}</h2>
      {!imagesAmount && !typeVideoValues[0].length ? (
        <p className="whitoutData-text">No Multimedia</p>
      ) : (
        <>
          <ul className="multimedia-menu">
            {typeVideoValues[0].length > 0 && (
              <li>
                <NavLink
                  to={`.?type=${type}`}
                  className={({ isActive }) =>
                    isActive
                      ? "multimedia-navLink-selected"
                      : "multimedia-navLink"
                  }
                  end
                >
                  Teaser
                </NavLink>
              </li>
            )}
            {imagesAmount && (
              <li>
                <NavLink
                  to={`detail-images?type=${type}&typeImage=${typeImage}`}
                  className={({ isActive }) =>
                    isActive
                      ? "multimedia-navLink-selected"
                      : "multimedia-navLink"
                  }
                >
                  Images ({imagesAmount})
                </NavLink>
              </li>
            )}
          </ul>
          <Outlet />
        </>
      )}
    </article>
  );
}

export default Multimedia;
