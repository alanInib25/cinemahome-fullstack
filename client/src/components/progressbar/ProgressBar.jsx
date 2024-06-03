//css
import "react-circular-progressbar/dist/styles.css";
import "./progressBar.css";
//progresbar
import { CircularProgressbar } from "react-circular-progressbar";

function ProgressBar({ data }) {
  const average = data && Math.ceil((data * 100) / 10);
  const text = average ? `${average}%` : "N/V";
    return (
    <CircularProgressbar
      value={average}
      text={text}
    />
  );
}

export default ProgressBar;
