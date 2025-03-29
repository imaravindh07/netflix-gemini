import React from 'react'
import { useSelector } from 'react-redux'
import { VedioTitle } from './VedioTitle'
import { VedioBackground } from './VedioBackground'

export const MainContainer = () => {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies);

    if (!movies || movies.length == 0) return null;
    const mainMovie=movies[0]
    const {original_title,overview,id}=mainMovie;
  return (
    <div className='pt-[30%] bg-black md:pt-0'>
        <VedioTitle title={mainMovie?.original_title} overview={mainMovie?.overview} />
        <VedioBackground movieId={id}/>
    </div>
  )
}
