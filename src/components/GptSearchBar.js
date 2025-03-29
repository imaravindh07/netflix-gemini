import React from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { API_OPTIONS, GEMINI_API_KEY } from '../utils/constants'
import { addGptMovieResults } from '../utils/gptSlice'
const GptSearchBar = () => {
  const  dispatch=useDispatch();
  const langkey=useSelector((store)=>store.config.lang);
  const searchText=useRef(null);
  const searchMovieTMDB=async (movie)=>{
    const data=await fetch(
      'https://api.themoviedb.org/3/search/movie?query='+
      movie+'&include_adult=false&language=en-US&page=1', 
      API_OPTIONS
    );
    const json=await data.json();

    return json.results;
    
  }
  const handleGptSearchClick=async(e)=>{
    e.preventDefault();
    const gptQuery=
      "Act as a Movie Recommendation system and suggest some movie for the query:"+
      searchText.current.value+
      ". only give me names of 5 movies(give names such that,there should be no movies using that name as substring),comma separated like the example given ahead. Example:Aravind,Yash,Xyz"
    //making gemini API Call
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = gptQuery;
    const result = await model.generateContent(prompt);
    if(!result.response.text())
    {
       
    }
    const gptMovies=result.response.text().split(",");

    //searching movie in TMDB API
    const promiseAarray=gptMovies.map((movie)=>searchMovieTMDB(movie))
    //give array of promises [promise,promise,promise,promise,promise]-not results

    const tmdbResults=await Promise.all(promiseAarray);
    
    dispatch(addGptMovieResults({movieNames:gptMovies,movieResults:tmdbResults}));
  }
  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center'>
        <form className='md:w-1/2 w-full  grid grid-cols-12'  >
            <input
              ref={searchText}
              type='text' 
              className='p-4 m-4 col-span-9'
              placeholder={lang[langkey].gptSearchPlaceholder}
            ></input>
            <button
              type="button"  
              className='col-span-3 py-2 px-2 m-4 bg-red-700 text-white'
              onClick={handleGptSearchClick}
            >
              {lang[langkey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar

