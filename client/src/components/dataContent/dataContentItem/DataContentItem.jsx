//react-router-dom
import { Link } from "react-router-dom";

//css
import "./dataContentItem.css"

//components
import Image from "../../image/Image.jsx";

function DataContentItem({ item, type }) {
  return (
    <Link
      to={
        type === "people"
          ? `/detail-people/${item.id}?type=${type}`
          : `/detail-item/${item.id}?type=${type}`
      }
    >
      <div className="dataContent-item">
        <Image item={item} />
        {type === "people" && (
          <div className="dataContent-item-info">
            <p className="dataContent-info-name">{item.name}</p>
            <p className="dataContent-info-poplarity">
              {item.popularity} Views
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default DataContentItem;
