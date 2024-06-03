//css
import "./review.css";

//componetns
import ItemReview from "./itemReview/ItemReview";

//custom
import { useSeeMoreHook } from "../../../customHook/useCustomerHook.js";

function Reviews({ item }) {
  const { results: reviews } = item.reviews;
  const { dataAmount, showMore, amount } = useSeeMoreHook(reviews);
  const dataReviews = dataAmount.map((review, index) => (
    <ItemReview key={index} review={review} />
  ));
  return (
    <article className="reviews">
      <h2>{`${item.title ? item.title : item.name} Reviews `}</h2>
      {!reviews.length ? (
        <p className="whitoutData-text">No Reviews</p>
      ) : (
        <>
          <div className="reviews-container">{dataReviews}</div>
          {reviews.length > amount && (
            <button onClick={showMore} className="see-more-btn">
              More Reviews
            </button>
          )}
        </>
      )}
    </article>
  );
}

export default Reviews;
