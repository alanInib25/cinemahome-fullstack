//css
import "./generalInfo.css";

//components
import ItemSocialIcons from "./infoSocial/InfoSocial";
import InfoTitle from "./infoTitle/InfoTitle";
import InfoItem from "./infoItem/InfoItem";
import InfoStatistics from "./infoStatistics/InfoStatistics";
import Text from "../../text/Text";
import Image from "../../image/Image";

function GeneralInfo({ item, type }) {
  return (
    <article className="generalInfo">
      <Image item={item} />
      <div className="generalInfo-details">
        <InfoTitle item={item} type={type} />
        <InfoItem item={item} type={type} />
        <div className="generalInfo-row">
          <InfoStatistics item={item} />
          <ItemSocialIcons item={item} />
        </div>
        <Text text={item.overview} title="Overview" />
      </div>
    </article>
  );
}
export default GeneralInfo;
