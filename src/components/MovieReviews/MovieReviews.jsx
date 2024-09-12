import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsMovie } from '../../services/movies-api';
import css from './MovieReviews.module.css'

const MovieReviews = ({ setLoading, setError }) => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setError(false);
    const getReviewsInfo = async () => {
      try {
        setLoading(true);
        const { data } = await fetchReviewsMovie(movieId);
        setReviews(data.results);

      } catch (err) {
        console.log(err.message);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };
    getReviewsInfo();
  }, [movieId]);

  
  return (
    <div>

      {Array.isArray(reviews) && reviews.length === 0 && (
        <p>We dont have any information about reviews</p>
      )}

      {Array.isArray(reviews) && (
        <ul className={css.list}>
          {reviews.map(review => {
            return (
              <li key={review.id} className={css.item}>
                <h3 className={css.title}>{review.author}</h3>
                <p className={css.text}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
