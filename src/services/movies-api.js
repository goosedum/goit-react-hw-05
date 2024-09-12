import axios from 'axios';

/**
 *
 * Finds the most popular movies today or week. The day by default/
 *
 */
export const fetchTrandingMoviesData = async () => {
  const timeWindow = {
    day: 'day',
    week: 'week',
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDU3ZDU4MTk3MzU5OTg0NDZhYTA0YTg4OTliOTU1ZSIsIm5iZiI6MTcyMzcwODU2NS40MTM4NjQsInN1YiI6IjY2YmRiMWQxNjE4N2IxNGI2M2MzODFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSwF87E5lMFRSB44A2efgNEkO2snwzdD2nhW6cf-ce0',
    },

    params: {
      api_key: '5d57d5819735998446aa04a8899b955e',
      include_adult: 'false',
      language: 'en-US',
    },
  };

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow.day}`,
    options
  );
  return data;
};

/**
 *
 * Finds movie by id. Request full movie information for a movie page
 * @param {String} movieId
 *
 */
export const fetchDetailsMovieData = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDU3ZDU4MTk3MzU5OTg0NDZhYTA0YTg4OTliOTU1ZSIsIm5iZiI6MTcyMzcwODU2NS40MTM4NjQsInN1YiI6IjY2YmRiMWQxNjE4N2IxNGI2M2MzODFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSwF87E5lMFRSB44A2efgNEkO2snwzdD2nhW6cf-ce0',
    },
    params: {
      api_key: '5d57d5819735998446aa04a8899b955e',
      include_adult: 'false',
      language: 'en-US',
    },
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options
  );
  return response;
};

/**
 *
 * Search for a movie by query on the movies page
 * @param {String} query
 *
 */
export const fetchMovieBySearch = async query => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDU3ZDU4MTk3MzU5OTg0NDZhYTA0YTg4OTliOTU1ZSIsIm5iZiI6MTcyMzcwODU2NS40MTM4NjQsInN1YiI6IjY2YmRiMWQxNjE4N2IxNGI2M2MzODFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSwF87E5lMFRSB44A2efgNEkO2snwzdD2nhW6cf-ce0',
    },

    params: {
      api_key: '5d57d5819735998446aa04a8899b955e',
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      query,
    },
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    options
  );

  return response;
};

/**
 *
 * Request cast information for a movie page.
 *
 */

export const fetchCastMovie = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDU3ZDU4MTk3MzU5OTg0NDZhYTA0YTg4OTliOTU1ZSIsIm5iZiI6MTcyMzcwODU2NS40MTM4NjQsInN1YiI6IjY2YmRiMWQxNjE4N2IxNGI2M2MzODFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSwF87E5lMFRSB44A2efgNEkO2snwzdD2nhW6cf-ce0',
    },
    params: {
      api_key: '5d57d5819735998446aa04a8899b955e',
      include_adult: 'false',
      language: 'en-US',
    },
  };
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    options
  );

  return response;
};

/**
 *
 * Request reviews for a movie page
 * 
 */
export const fetchReviewsMovie = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDU3ZDU4MTk3MzU5OTg0NDZhYTA0YTg4OTliOTU1ZSIsIm5iZiI6MTcyMzcwODU2NS40MTM4NjQsInN1YiI6IjY2YmRiMWQxNjE4N2IxNGI2M2MzODFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSwF87E5lMFRSB44A2efgNEkO2snwzdD2nhW6cf-ce0',
    },
    params: {
      api_key: '5d57d5819735998446aa04a8899b955e',
      include_adult: 'false',
      language: 'en-US',
    },
  };
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    options
  );

  return response;
};
