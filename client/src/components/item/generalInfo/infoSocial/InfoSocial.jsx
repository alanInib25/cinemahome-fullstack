//react-icons
import { TbWorldWww } from "react-icons/tb";
import { RiFacebookBoxFill, RiInstagramLine } from "react-icons/ri";
import { FaWikipediaW } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

//css
import "./infoSocial.css";

//urls
const url_facebook = "https://www.facebook.com";
const url_instagram = "https://www.instagram.com";
const url_wikidata = "http://www.wikidata.org/entity";
const url_imdb = "https://www.imdb.com";
const url_twitter = "https://twitter.com";

function ItemSocialIcons({ item, type = "" }) {
  return (
    <div className="infoSocial">
      {item.external_ids.wikidata_id && (
        <Link
          to={`${url_wikidata}/${item.external_ids.wikidata_id}`}
          target="_blank"
        >
          <FaWikipediaW className="social-icon" />
        </Link>
      )}

      {item.homepage && (
        <Link to={item.homepage} target="_blank" aria-label="red">
          <TbWorldWww className="social-icon" />
        </Link>
      )}

      {item.external_ids.facebook_id && (
        <Link
          to={`${url_facebook}/${item.external_ids.facebook_id}`}
          target="_blank"
        >
          <RiFacebookBoxFill className="social-icon" />
        </Link>
      )}

      {item.external_ids.instagram_id && (
        <Link
          to={`${url_instagram}/${item.external_ids.instagram_id}/`}
          target="_blank"
        >
          <RiInstagramLine className="social-icon" />
        </Link>
      )}

      {item.external_ids.imdb_id && (
        <Link
          to={`${url_imdb}/${type === "people" ? "name" : "title"}/${
            item.external_ids.imdb_id
          }`}
          target="_blank"
        >
          <SiImdb className="social-icon" />
        </Link>
      )}

      {item.external_ids.twitter_id && (
        <Link to={`${url_twitter}/${item.external_ids.twitter_id}`}>
          <FaXTwitter className="social-icon" />
        </Link>
      )}
    </div>
  );
}

export default ItemSocialIcons;
