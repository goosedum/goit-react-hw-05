import { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom"
const HomePage = lazy(() => import('../../pages/HomePage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
import Navigation from "../Navigation/Navigation"
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage= lazy(() => import('../../pages/NotFoundPage'));


const App = () => {
  return (
      <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} /> 
        
            
          </Routes>
          </Suspense>
    </div>
  )
}

export default App