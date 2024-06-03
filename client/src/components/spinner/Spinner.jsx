import { RotatingLines } from "react-loader-spinner";

//css
import "./spinner.css"

function Spinner() {
  return (
    <div className="spinner">
      <RotatingLines
        visible={true}
        height="46"
        width="46"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass="spinner"
        strokeColor="red"
      />
    </div>
  );
}

export default Spinner;
