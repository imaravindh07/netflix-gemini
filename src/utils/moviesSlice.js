import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:'movies',
    initialState:{
        nowPlayingMovies:null,
        trailerVedio:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        addTrailerVedio:(state,action)=>{
            state.trailerVedio=action.payload;
        }
    }
})

export const {addNowPlayingMovies,addTrailerVedio}=movieSlice.actions;
export default movieSlice.reducer;