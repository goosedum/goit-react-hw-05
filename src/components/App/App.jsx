import { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import css from './App.module.css';

// --------- Components
import MovieCast from '../MovieCast/MovieCast';
import Navigation from '../Navigation/Navigation';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';

// --------------------/

// --------------- Pages
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
// --------------------/

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Navigation />
        </div>
      </header>

      <main>
        <div className={css.container}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <MoviesPage
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                  />
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <MovieDetailsPage
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                  />
                }
              >
                <Route
                  path="cast"
                  element={
                    <MovieCast
                      loading={loading}
                      setLoading={setLoading}
                      error={error}
                      setError={setError}
                    />
                  }
                />
                <Route
                  path="reviews"
                  element={
                    <MovieReviews
                      loading={loading}
                      setLoading={setLoading}
                      error={error}
                      setError={setError}
                    />
                  }
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
