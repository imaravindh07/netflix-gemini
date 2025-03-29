import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

function MovieInfo({ movie, closeModal }) {
  const { title, overview, poster_path, vote_average } = movie;

  return (
    <div className="fixed w-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-4 rounded-lg shadow-lg md:w-full md:w-10/12 mt-4 md:max-w-3xl">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-xl font-bold text-gray-700"
      >
        &times;
      </button>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <img
          alt={title}
          src={poster_path ? `${IMG_CDN_URL}${poster_path}` : '/path/to/default-image.jpg'}
          className="w-40 h-60 object-cover rounded-lg flex-shrink-0 md:w-48 md:h-72"
        />
        <div className="flex flex-col justify-center md:w-full md:w-auto">
          {/* Adjusted title styling */}
          <p className="font-semibold text-xl mb-2 text-center md:text-left md:text-2xl lg:text-3xl text-black">{title}</p>
          {/* Adjusted description text for better visibility */}
          <p className="text-sm text-gray-600 text-center md:text-left">{overview}</p>
          <h5 className="mt-2 font-semibold text-black md:text-left">Rating: {vote_average}</h5>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
