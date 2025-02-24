import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

export const VedioBackground = ({ movieId }) => {
    useMovieTrailer(movieId); // Fetches and stores the trailer in Redux

    const trailerVedio = useSelector(store => store.movies?.trailerVedio);
    console.log("Trailer Key:", trailerVedio?.key); // ✅ Debugging

    if (!trailerVedio || !trailerVedio.key) {
        return <div className="text-white">Trailer not available</div>;
    }
    return (
        <div className="w-screen">
           <iframe
            className="w-screen aspect-video"
            src={`https://www.youtube.com/embed/${trailerVedio?.key}?autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
         />

        </div>
    );
};
