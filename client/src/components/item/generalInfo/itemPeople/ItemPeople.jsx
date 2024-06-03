//css
import "./itemPeople.css";

function ItemPeople({ item }) {
  return (
    <div className="itemPeople">
      <span>
        <small>Birthday:</small>
        {item.birthday}
      </span>
      <span>
        <small>Place of birth: </small>
        {item.place_of_birth}
      </span>
      <span>
        <small>Known For: </small>
        {item.known_for_department}
      </span>
    </div>
  );
}

export default ItemPeople;
