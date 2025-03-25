import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'
const GptMovieSuggestions = () => {
  const {movieNames,movieResults}=useSelector((store)=>store.gpt);
  if(!movieNames) return null;
  return (
    <div className='m-4 p-4 text-white bg-black bg-opacity-90'>
      {
        movieNames.map((movieName,index)=>(
        <MovieList 
          key={movieName} 
          title={movieName}
          movies={movieResults[index]}
        />
        ))
      }
    </div>
  )
}

export default GptMovieSuggestions