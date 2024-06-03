//css
import "./dataContent.css";
//context
import { useFetch } from "../../context/FetchContext";

import DataContentItem from "./dataContentItem/DataContentItem";
import Spinner from "../spinner/Spinner";

function DataContent({ title, data, type }) {
  const { loading } = useFetch();
  return (
    <article className="dataContent">
      <h2 className="dataContent-title">{`${title} ${type}`}</h2>
      <div className="dataContent-items-container">
        {data.map((item, index) => (
          <DataContentItem key={index} item={item} type={type} />
        ))}
      </div>
      {loading && <Spinner />}
    </article>
  );
}

export default DataContent;
