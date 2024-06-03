import { useEffect } from "react";

//context
import { usePeople } from "../../context/PeopleContext";
import { useFetch } from "../../context/FetchContext";

//custom hook
import useInfiniteScrollHook from "../../customHook/useInfiniteScroll";

//components
import DataContent from "../../components/dataContent/DataContent";
import BackButton from "../../components/backButton/BackButton";

//css
import "./celebrities.css";
import Spinner from "../../components/spinner/Spinner";

function Celebrities() {
  const {
    peopleData,
    getPeople,
  } = usePeople();

  const { error, loading } = useFetch();
  const { targetToObserver } = useInfiniteScrollHook();

  useEffect(() => {
    window.scroll(0, 0);
    if(!peopleData.people.length){
      getPeople(peopleData.pagePeople + 1);
    }
  }, []);

  useEffect(() => {
    if (peopleData.people.length) return targetToObserver();
  }, [peopleData]);

  return (
    <section className="celebrities">
      <div className="celebrities-top">
        <BackButton />
        {error.message.length > 0 && (
          <span className="message-text">{error.message}</span>
        )}
      </div>
      <article className="celebrities-content">
        {!peopleData.people.length && loading ? (
          <Spinner />
        ) : (
          <DataContent title="Celebrities" type="people" data={peopleData.people} />
        )}
      </article>
    </section>
  );
}

export default Celebrities;
