import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
    playlists : null
}

const playlistSlice = createSlice({
    name : "playlist",
    initialState,
    reducers : {
        ASSIGN_PLAYLISTS : (state,action) => {
            state.playlists = action.payload
        },
        UN_ASSIGN_PLAYLISTS : (state,action) => {
            state.playlists = action.payload
        }

    }
})

export const { ASSIGN_PLAYLISTS, UN_ASSIGN_PLAYLISTS } = playlistSlice.actions;
export default playlistSlice.reducer;