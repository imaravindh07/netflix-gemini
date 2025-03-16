import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTrailerVedio } from '../utils/moviesSlice'

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()

  const getMovieVedios = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS)
    const json = await data.json()
    const filterData = json.results.filter((video) => video.type === 'Trailer')
    const trailer = filterData.length ? filterData[0] : json.results[0]
    dispatch(addTrailerVedio(trailer))  // Dispatch the action to update the store
  }

  useEffect(() => {
    if (movieId) { // Check if movieId is valid
      getMovieVedios()
    }
  }, [movieId])  // Re-run when movieId changes
}

export default useMovieTrailer
