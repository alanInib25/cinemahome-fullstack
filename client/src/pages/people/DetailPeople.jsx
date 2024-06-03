import { useEffect } from "react";

//react-router-dom
import { useParams } from "react-router-dom";

//context
import { usePeople } from "../../context/PeopleContext";
import { useFetch } from "../../context/FetchContext";

//components
import Carrusel from "../../components/carrusel/Carrusel";
import Text from "../../components/text/Text";
import InfoTitle from "../../components/item/generalInfo/infoTitle/InfoTitle";
import ItemSocialIcons from "../../components/item/generalInfo/infoSocial/InfoSocial";
import BackButton from "../../components/backButton/BackButton";

//css
import "./detailPeople.css";

//components
import ItemPeople from "../../components/item/generalInfo/itemPeople/ItemPeople";
import Image from "../../components/image/Image";
import InfoStatistics from "../../components/item/generalInfo/infoStatistics/InfoStatistics";
import Spinner from "../../components/spinner/Spinner";

function DetailPeople() {
  const { getPeopleDetail, peopleDetail } = usePeople();
  const { loading, error } = useFetch;
  const { id } = useParams();

  useEffect(() => {
    getPeopleDetail(id);
    window.scroll(0, 0);
  }, [id]);
  return (
    <section>
      <div className="detail-people-top">
        <BackButton />
        {error?.message.length > 0 && (
          <span className="message-text">{error.message}</span>
        )}
      </div>
      {loading || !Object.keys(peopleDetail).length ? (
        <Spinner />
      ) : (
        <>
          <article className="detail-people">
            <Image item={peopleDetail} />
            <div className="detail-people-content">
              <InfoTitle item={peopleDetail} type="people" />
              <ItemPeople item={peopleDetail} />
              <div className="detail-people-row">
                <InfoStatistics item={peopleDetail} type="people" />
                <ItemSocialIcons item={peopleDetail} type="people" />
              </div>
              <Text text={peopleDetail.biography} title="Biography" />
            </div>
          </article>
          <article className="detail-people-cast">
            <Carrusel
              data={peopleDetail.movie_credits.cast}
              type="movies"
              title={`${peopleDetail.name} movie's cast's`}
            />
            <Carrusel
              data={peopleDetail.tv_credits.cast}
              type="series"
              title={`${peopleDetail.name} tv's cast's`}
            />
          </article>
        </>
      )}
    </section>
  );
}

export default DetailPeople;
