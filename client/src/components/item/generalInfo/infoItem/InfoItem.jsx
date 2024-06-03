//components
import InfoGenre from "../infoGenres/InfoGenres"

//css
import "./infoItem.css"

//customer hook
import { useRunTimeHook } from "../../../../customHook/useCustomerHook"

//retorna informacion general de item
function InfoItem({ item, type }) {
  const duration = item.runtime ? useRunTimeHook(item.runtime) : `${item.number_of_seasons} season`;
  return (
    <div className="infoItem">
      <span>{item.adult ? +18 : "TE"}</span>
      <span>
        {type === "movies"
          ? item.release_date
            ? item.release_date.split("-").reverse().join("/")
            : <p className="whitoutData-text">No Release date</p>
          : type === "series"
          ? item.first_air_date.split("-").reverse().join("/")
          : <p className="whitoutData-text">No first Air Date</p>}
      </span>
      <span>{duration}</span>
      <span>HD</span>
      {/* genres */ <InfoGenre data={item} type={type}/>}
    </div>
  );
}

export default InfoItem;
