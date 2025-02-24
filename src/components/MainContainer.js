import React from 'react'
import { useSelector } from 'react-redux'
import { VedioTitle } from './VedioTitle'
import { VedioBackground } from './VedioBackground'

export const MainContainer = () => {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies);

    if (!movies || movies.length == 0) return null;
    const mainMovie=movies[0]
    const {riginal_title,overview,id}=mainMovie;
  return (
    <div>
        <VedioTitle title={mainMovie?.original_title} overview={mainMovie?.overview} />
        <VedioBackground movieId={id}/>
    </div>
  )
}
