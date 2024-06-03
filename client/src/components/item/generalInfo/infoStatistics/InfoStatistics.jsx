//import components
import ProgressBar from "../../../progressbar/ProgressBar";

//css
import "./infoStatistics.css";

function InfoStatistics({ item, type }) {
  return (
    <div className="infoStatistics">
      {item.vote_average && (
        <div className="infoStatistics-progressbar">
          <ProgressBar data={item.vote_average} />
          <span>User Score</span>
        </div>
      )}
      {item.popularity && type === "people" && (
        <div className="infoStatistics-popularity">
          <span>{item.popularity}K</span>
          <small>Popularity</small>
        </div>
      )}
    </div>
  );
}

export default InfoStatistics;
