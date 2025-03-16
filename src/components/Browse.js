import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import { MainContainer } from './MainContainer';
import { SecondaryContainer } from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from './useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import GptSearch from './GptSearch';
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)

  return (
    <div>
      <Header />
      {
        showGptSearch?(
        <GptSearch />):(
        <>
          <MainContainer />
          <SecondaryContainer />
        </>)
      }
    </div>
  )
}

export default Browse