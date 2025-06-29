import { configureStore } from "@reduxjs/toolkit"

// reducer
import authReducer from "@/context/authSlice"
import playlist from "@/context/playlistSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        playlist : playlist
    }
});