
//custom hook
import { useImageUrlValidationHook } from "../../customHook/useCustomerHook.js";
//components
import Logo from "../logo/Logo.jsx";

//css
import "./image.css"

//imagen por defecto si no existe data
const imageDefault = "/src/assert/images/notData/default.jpg";

function Image({ item }) {
  //use custom hook
  const pathImage = useImageUrlValidationHook(item);

  return (
    <picture>
      {pathImage ? (
        <img
          src={`${import.meta.env.VITE_API_URL_IMAGEN}/${pathImage}`}
          alt={item.title}
          className="image"
        />
      ) : (
        <>
          <img
            src={`${imageDefault}`}
            alt="No existe imagen original"
            className="image"
          />
          <h3 className="image-title">{item.name || item.title}</h3>
        </>
      )}
    </picture>
  );
}

export default Image;
