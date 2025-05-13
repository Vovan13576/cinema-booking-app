import React, { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <input
        type="text"
        placeholder="Пошук фільмів..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;