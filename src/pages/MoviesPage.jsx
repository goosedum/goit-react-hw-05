import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import css from './MoviesPage.module.css';

const API_KEY = '3d038329c18432526df90308185ea4bc';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAzODMyOWMxODQzMjUyNmRmOTAzMDgxODVlYTRiYyIsIm5iOiIxNzIzOTk1NjQ2Ljc0NjQ5NCIsInN1YiI6IjY2YzIxMGRlMThlNjYyMmFkY2QzNDVlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nCZe9VjKyub-4CEK_TECHdsfUCTV9J81gkkxCY-RarA';

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
