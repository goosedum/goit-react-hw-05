import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import css from './MoviesPage.module.css';
const API_KEY = '5f3252bb16854277a60c3e02fb4a4f15';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjMyNTJiYjE2ODU0Mjc3YTYwYzNlMDJmYjRhNGYxNSIsIm5iZiI6MTcyNjk1MTU4Ny42OTkzNDksInN1YiI6IjY2ZWYyY2UxNWVlNjFmYmI3MzhkNTA5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d1UWxFLxVCIdS_ToA7LY1PLKtIEI8GxD5FAcZWT1gDM';


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            query,
            api_key: API_KEY,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching for movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.search.value.trim();

    if (searchQuery === '') {
      setSearchParams({});
      setMovies([]);
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={css.MovieListcontainer}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          className={css.searchInput}
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button className={css.searchButton} type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
