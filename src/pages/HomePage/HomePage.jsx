import { useEffect, useState } from 'react';
import { fetchTrandingMoviesData } from '../../services/movies-api';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css'

const HomePage = ({ loading, setLoading, error, setError }) => {
  const [movies, setMovies] = useState(null);
  
  useEffect(() => {
    setError(false);
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchTrandingMoviesData();
        setMovies(data.results);
        
      } catch (err) {
        setError(err.message);
        
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [setLoading, setError]);
  
  // console.log(Array.isArray(movies));

  return (
    <section className="homePage">
      {loading ? (
        <Loader />
      ) : (
        <h1 className={css.title}>TOP the most popular movies today</h1>
      )}

      {error && <p>{error}</p>}

      {Array.isArray(movies) && <MovieList movies={movies} />}
    </section>
  );
};

export default HomePage;
