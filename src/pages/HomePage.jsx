import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';
import css from './HomePage.module.css';

const API_KEY = '3d038329c18432526df90308185ea4bc';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAzODMyOWMxODQzMjUyNmRmOTAzMDgxODVlYTRiYyIsIm5iZiI6MTcyMzk5NTY0Ni43NDY0OTQsInN1YiI6IjY2YzIxMGRlMThlNjYyMmFkY2QzNDVlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nCZe9VjKyub-4CEK_TECHdsfUCTV9J81gkkxCY-RarA';
const TRENDING_MOVIES_URL = 'https://api.themoviedb.org/3/trending/movie/day';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(TRENDING_MOVIES_URL, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            api_key: API_KEY,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching the trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
