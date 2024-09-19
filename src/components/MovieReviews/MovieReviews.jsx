
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import css from './MovieReviews.module.css';
const MovieReviews = () => {
  const { reviews } = useOutletContext();

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
        <ul className={css.reviewList}>
        {reviews.map((review) => (
          <li key={review.id}>
                <h2 className={css.author}>{review.author}</h2>
                <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default MovieReviews;
