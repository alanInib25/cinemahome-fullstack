//css
import "./text.css";
//retorna el overview del item
function Text({ text, title }) {
  return (
    <div className="text">
      <>
        <h2>{title}</h2>
        {!text.length ? (
          <p className="whitoutData-text">No Data</p>
        ) : (
          <p>{text}</p>
        )}
      </>
    </div>
  );
}

export default Text;
