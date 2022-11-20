import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'http://127.0.0.1:4000'

const initialState = () => {
    return {
        user: [],
        registered: []/* ,
        message: [] */
    };
}

export const loginUser = createAsyncThunk(
    'currentUser/loginUser',
    async (callData) => {
        const {email, password} = callData
        const response = await fetch(`${BASE_URL}/users/login`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email_address": `${email}`,
                "password": `${password}`
            })
        }) 
        const user = await response.json()
        return user
    }
)

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: initialState(),
    reducers: {
        resetCurrentUser: () => initialState()
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loginUser.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    }
    
})

export const {resetCurrentUser} = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser.user
export default currentUserSlice.reducer