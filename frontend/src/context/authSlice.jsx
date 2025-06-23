import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        ASSIGN : (state,action) => {
            state.token = action.payload;
        },
        UN_ASSIGN : (state,action) => {
            state.token = action.payload;
        }
    }
});

export const { ASSIGN, UN_ASSIGN } = authSlice.actions;
export default authSlice.reducer;