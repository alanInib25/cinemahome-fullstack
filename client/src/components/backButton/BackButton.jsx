import { useNavigate } from "react-router-dom";

//react-icons
import { MdOutlineKeyboardBackspace } from "react-icons/md";

//css
import "./backButton.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <MdOutlineKeyboardBackspace
      className="back-button"
      onClick={() => navigate(-1)}
    />
  );
}

export default BackButton;
