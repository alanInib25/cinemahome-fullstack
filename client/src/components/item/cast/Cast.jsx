//css
import "./cast.css";

//components
import ItemCast from "./itemCast/ItemCast";
import SwiperComp from "../../SwiperComp";

function Cast({ item }) {
  const { cast } = item.credits;

  //Creamos interfaz para los creditos del item
  const itemsCast = cast.map((castItem) => <ItemCast cast={castItem} />);

  return (
    <article className="cast">
      <h2>{`${item.title ? item.title : item.name} Cast's `}</h2>
      <div className="cast-container">
        {!cast.length ? (
          <p className="whitoutData-text">No Cast</p>
        ) : (
          <SwiperComp iterableData={itemsCast} />
        )}
      </div>
    </article>
  );
}

export default Cast;
