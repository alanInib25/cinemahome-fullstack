//react-router-dom
import { Link } from "react-router-dom";

//components
import Image from "../image/Image.jsx";

//css
import "./itemToSwiper.css";
import Logo from "../logo/Logo.jsx";

/*
->componente utilizado para crear el contenido del swiper
->Parametro type = "series" || "movies"
->Link para mostrar el detalle del item que se selecciona
->useImageUrlValidationHook valida path de la imagen
*/
function ItemToSwiper({ item, type = "" }) {
  return (
    <Link to={`/detail-item/${item.id}?type=${type}`}>
      <Logo cssName="logoItemToSwiper"/>
      <Image item={item}/>
    </Link>
  );
}

export default ItemToSwiper;
