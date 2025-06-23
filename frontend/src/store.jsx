import { configureStore } from "@reduxjs/toolkit"

// reducer
import authReducer from "@/context/authSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
    }
});