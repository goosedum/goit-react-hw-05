import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';
import css from './HomePage.module.css';

const API_KEY = '5f3252bb16854277a60c3e02fb4a4f15';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjMyNTJiYjE2ODU0Mjc3YTYwYzNlMDJmYjRhNGYxNSIsIm5iZiI6MTcyNjk1MTU4Ny42OTkzNDksInN1YiI6IjY2ZWYyY2UxNWVlNjFmYmI3MzhkNTA5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d1UWxFLxVCIdS_ToA7LY1PLKtIEI8GxD5FAcZWT1gDM';
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
