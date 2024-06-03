//react-icons
import { LiaStarSolid } from "react-icons/lia";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

//customHook
import {
  useSeeMoreTextHook,
  useSeeMoreHook,
} from "../../../../customHook/useCustomerHook";

//components
import AvatarComp from "../../../AvatarComp";

//see images api
const API_URL_IMAGEN = import.meta.env.VITE_API_URL_IMAGEN;

//css
import "./itemReview.css";

function ItemReview({ review }) {
  const { seeMoreText, moreText, seeMoreTextView } = useSeeMoreTextHook(
    review.content
  );

  return (
    <div className="itemReviews">
      <div className="itemReviews-author-info">
        <picture className="itemReviews-author-avatar">
          {review.author_details.avatar_path === null ? (
            <AvatarComp
              name={`${review.author_details.name || review.author}`}
              className="itemReviews-avatar-default"
            />
          ) : (
            <img
              src={`${API_URL_IMAGEN}/${review.author_details.avatar_path}`}
              className="itemReviews-avatar"
            />
          )}
        </picture>
        <span className="itemReviews-author-name">
          By @
          {review.author_details.username
            ? review.author_details.username
            : review.author}
        </span>
        {review.author_details.rating && (
          <span className="itemReviews-author-rating">
            <LiaStarSolid className="star-rating" />
            {(review.author_details.rating * 100) / 10}
            <small>%</small>
          </span>
        )}
      </div>
      {
        <p className="itemReviews-author-post">
          <>
            {moreText.length < 350 ? (
              moreText
            ) : (
              <>
                {moreText.concat(" ... ")}
                <small className="seeMore" onClick={seeMoreTextView}>
                  {!seeMoreText ? (
                    <>
                      See more <FaCaretDown />
                    </>
                  ) : (
                    <>
                      See less <FaCaretUp />
                    </>
                  )}
                </small>
              </>
            )}
          </>
        </p>
      }
    </div>
  );
}

export default ItemReview;
