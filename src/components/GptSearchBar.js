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
    console.log(searchText.current.value);
    const gptQuery=
      "Act as a Movie Recommendation system and suggest some movie for the query:"+
      searchText.current.value+
      ". only give me names of 5 movies,comma separated like the example given ahead. Example:Aravind,Yash,Xyz"
    //make an  API call to GPT API and get movie results
    // const gptResults=await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //       {
    //           role: "user",
    //           content:gptQuery,
    //       },
    //   ],
    // });
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = gptQuery;
    const result = await model.generateContent(prompt);
    if(!result.response.text())
    {
      console.log("error while fecting the data");
    }
    const gptMovies=result.response.text().split(",");

    //searching movie in TMDB API
    const promiseAarray=gptMovies.map((movie)=>searchMovieTMDB(movie))
    //give array of promises [promise,promise,promise,promise,promise]-not results

    const tmdbResults=await Promise.all(promiseAarray);
    console.log(tmdbResults);
    dispatch(addGptMovieResults({movieNames:gptMovies,movieResults:tmdbResults}));
  }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'  >
            <input
              ref={searchText}
              type='text' 
              className='p-4 m-4 col-span-9'
              placeholder={lang[langkey].gptSearchPlaceholder}
            ></input>
            <button
              type="button"  
              className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white'
              onClick={handleGptSearchClick}
            >
              {lang[langkey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import lang from '../utils/languageConstants';
// import { GEMINI_API_KEY, GEMINI_API_URL } from '../utils/constants';

// const GptSearchBar = () => {
//   const langkey = useSelector((store) => store.config.lang);
//   const [searchText, setSearchText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [movieSuggestions, setMovieSuggestions] = useState([]);
//   const [error, setError] = useState(null);

//   const handleGptSearchClick = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${searchText}". Only return 5 movie names, comma-separated.`;
  
//     try {
//       const response = await fetch(GEMINI_API_URL, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${GEMINI_API_KEY}`  
//         },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: gptQuery }] }] 
//         }),
//       });
  
//       const data = await response.json();
  
//       if (data?.candidates?.length > 0) {
//         setMovieSuggestions(data.candidates[0]?.content.split(',').map((movie) => movie.trim()));
//       } else {
//         setError("No movie suggestions found.");
//       }
//     } catch (error) {
//       setError("Error fetching from Gemini API.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pt-[10%] flex justify-center">
//       <form className="w-1/2 bg-black grid grid-cols-12">
//         <input
//           type="text"
//           className="p-4 m-4 col-span-9"
//           placeholder={lang[langkey]?.gptSearchPlaceholder || "Search for movies..."}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <button
//           type="button"
//           className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white"
//           onClick={handleGptSearchClick}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : lang[langkey]?.search || "Search"}
//         </button>
//       </form>

//       {error && <div className="text-red-500">{error}</div>}

//       {movieSuggestions.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-white">Movie Suggestions:</h3>
//           <ul className="list-disc pl-6 text-white">
//             {movieSuggestions.map((movie, index) => (
//               <li key={index}>{movie}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GptSearchBar;
