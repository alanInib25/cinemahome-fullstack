//css
import "./dashboardContent.css";

//react-router-dom
import { Link } from "react-router-dom";

//components
import ItemToSwiper from "../itemSwiper/ItemToSwiper";
import SwiperComp from "../SwiperComp";

//react-icons
import { LuListVideo } from "react-icons/lu";
/*
-> Componente que retorna swiper con la data enviada (series y movies) 
*/
function DashboardContent({ data, type }) {
  const clase = data[0]; //popular || rated
  const title =
    clase === "popular"
      ? `The most ${data[0]} ${type}`
      : `The best ${data[0]} ${type}`;
  const dataToDisplay = data[1];

  const itemsToSwiper = dataToDisplay.map((item) => (
    <ItemToSwiper item={item} type={type} />
  ));

  return (
    <article className="dashboardContent">
      <Link to={`/${type}`} className="dashboardContent-link">
        <span className="dashboardContent-name">
          {title}
          <LuListVideo className="LuListVideo" />
        </span>
      </Link>
      {!itemsToSwiper.length ? (
        <p className="whitoutData-text">{`no ${clase} data`}</p>
      ) : (
        <SwiperComp iterableData={itemsToSwiper} />
      )}
    </article>
  );
}

export default DashboardContent;
