import { useEffect, useState } from "react";

//css
import "./search.css";


//custom hook
import useSearch from "../../customHook/useSearch";

function Search({ type }) {
  const [text, setText] = useState("");
  const { searchForTitle } = useSearch(type);

  useEffect(() => {
    searchForTitle(text);
  }, [text]);

  function handleChange(e) {
    return setText(e.target.value);
  }

  return (
    <article className="search">
      <h3>Search for Title</h3>
      <input
        type="text"
        name="title"
        id="title"
        placeholder={`${text ? "" : `🔍 Search for Title`}`}
        value={text}
        onChange={handleChange}
      />
      <small>Min. 3 characters</small>
    </article>
  );
}

export default Search;
