//components
import SwiperComp from "../SwiperComp";
import ItemToSwiper from "../itemSwiper/ItemToSwiper";

//css
import "./carrusel.css";

function Carrusel({ data, title, type }) {

  const dataToSwiper = data.map((item) => (
    <ItemToSwiper item={item} type={type} />
  ));

  return (
    <article className="carrusel">
      <h2>{title}</h2>
      {!dataToSwiper.length
       ?  <p className="whitoutData-text">No Data</p>
       : <SwiperComp iterableData={dataToSwiper} />
      }
    </article>
  );
}

export default Carrusel;
