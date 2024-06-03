//react-icons
import { RiMovieLine } from "react-icons/ri";

//css
import "./logo.css";

function Logo({ cssName }) {
  return <RiMovieLine className={`logo ${cssName}`} />;
}

export default Logo;