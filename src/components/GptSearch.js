import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

function GptSearch() {
  return (
    <div>
        <div className='fixed -z-10'>
          <img
            className='h-screen object-cover md:h-auto' 
            src={BG_URL}
            alt="logo">
          </img>
        </div>
        <div className=''>
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
        
    </div>
  )
}

export default GptSearch;