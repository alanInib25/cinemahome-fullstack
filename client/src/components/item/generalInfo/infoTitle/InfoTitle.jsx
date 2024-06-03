//css
import "./infoTitle.css";
//retorna título del item
function InfoTitle({ item, type }) {
  return (
    <h2 className="infoTitle">
      {`${item.title || item.name}`}
      {!type === "people" && (
        <span>
          {`(${
            type === "movies"
              ? item.release_date
                ? item.release_date.split("-", 1)
                : "s/d"
              : type === "series"
              ? item.first_air_date.split("-", 1)
              : "s/d"
          })`}
        </span>
      )}
    </h2>
  );
}

export default InfoTitle;
