import React from 'react';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Кінотеатр</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;

