
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { cast } = useOutletContext();

  if (!cast || cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div className={css.castList}>
      
      <ul className={css.castList}>
        {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
                <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={css.actorImage}
               />
               <p className={css.actorInfo}>
               {actor.name}
                </p>
                <p className={css.actorInfo}> Character:{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};

export default MovieCast;
