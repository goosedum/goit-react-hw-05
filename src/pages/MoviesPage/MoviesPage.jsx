import { useEffect, useState } from 'react';
import { fetchMovieBySearch } from '../../services/movies-api';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

import { Toaster } from 'react-hot-toast';
import {
  sendNoteEmptyField,
  sendNoteBadRequest,
} from '../../services/messages';
// ----------------------------------------------------------/

const MoviesPage = ({ loading, setLoading, error, setError }) => {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  // --------------------------------------------------------/
  useEffect(() => {
    setError(false);

    if (!query) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieBySearch(query);

        setMovies(data.data.results);

        if (data.data.results.length === 0) {
          sendNoteBadRequest();
        }

      } catch (err) {
        setError(err.message);
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [query]);
  // --------------------------------------------------------/

  const onSearch = queryValue => {
    setSearchParams({
      query: queryValue,
    });

    console.log('query', query);
    //------------------------------------------------------/
    if (queryValue === '') {
      sendNoteEmptyField();
    }
    //------------------------------------------------------/
  };

  return (
    <section className="moviePage">
      
      <SearchForm onSearch={onSearch} />
      {/* {loading && <Loader />} */}

      {error && <p>{error}</p>}

      {Array.isArray(movies) && movies.length > 0 && (
        <MovieList movies={movies} />
      )}


      <Toaster />
    </section>
  );
};

export default MoviesPage;
