import React, { useState } from "react";
import { MovieCard } from "./MovieCard";
import MovieInfo from "./MovieInfo";
import '../App.css';   


const MovieList = ({ title, movies = [] }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);  
  };

  const closeModal = () => {
    setSelectedMovie(null); 
  };

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {movies?.map((movie) => (
            <div key={movie.id} onClick={() => handleCardClick(movie)}>
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>

  
      {selectedMovie && (
        <MovieInfo movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieList;

