import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

function GptSearch() {
  return (
    <div>
        {/* {gpt search bar and gpt movie suggestions} */}
        <div className='fixed -z-10'>
            <img src={BG_URL}
              alt="logo">
            </img>
          </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch;