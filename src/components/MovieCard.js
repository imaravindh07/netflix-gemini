import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

export const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="rounded-lg w-36 md:w-48 pr-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-[-10px] hover:shadow-lg cursor-pointer">
      {/* Movie Poster */}
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
