import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RiArrowGoBackFill } from "react-icons/ri";
import css from './MovieDetailsPage.module.css';

const API_KEY = '3d038329c18432526df90308185ea4bc';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAzODMyOWMxODQzMjUyNmRmOTAzMDgxODVlYTRiYyIsIm5iOiIxNzIzOTk1NjQ2Ljc0NjQ5NCIsInN1YiI6IjY2YzIxMGRlMThlNjYyMmFkY2QzNDVlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nCZe9VjKyub-4CEK_TECHdsfUCTV9J81gkkxCY-RarA';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Використання useRef для збереження попереднього шляху
  const previousLocation = useRef(location.state?.from || '/movies');

  const handleGoBack = () => {
    navigate(previousLocation.current);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching the movie details:', error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            api_key: API_KEY,
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching the movie credits:', error);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            api_key: API_KEY,
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching the movie reviews:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieReviews();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={css.buttonWrapper}>
        <RiArrowGoBackFill className={css.buttonIcon} />
        <button className={css.button} onClick={handleGoBack}>
           Go Back
        </button>
      </div>
      <div className={css.movieDetailsWrapper}>
        <img
          className={css.movieImage}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={css.movieInfo}>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
          <h2>Release Date</h2>
          <p>{movie.release_date}</p>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h2>Additional information</h2>
        <ul className={css.additionalInfoList}>
          <li><Link to="cast">View Cast</Link></li>
          <li><Link to="reviews">View Reviews</Link></li>
        </ul>
        <Outlet context={{ cast, reviews }} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
