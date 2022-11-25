import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        user: [],
        registered: []
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

export const registerUser = createAsyncThunk(
    'currentUser/registerUser',
    async (callData) => {
        const {fname, lname, address, email, password} = callData
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": `${fname}`,
                "last_name": `${lname}`,
                "address": `${address}`,
                "email_address": `${email}`,
                "password": `${password}`
            }),  
        })
        const newUser = await response.json()
        return newUser
    }
)

export const logoutUser = createAsyncThunk(
    'currentUser/logoutUser',
    async () => {
        const id = store.getState().currentUser.user.id
        const response = await fetch(`${BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": `${id}`,
            }), 
        }) //TODO: add user.id to backend
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
            state.registered = []
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loginUser.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [registerUser.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.registered = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [registerUser.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [logoutUser.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.user = []
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [logoutUser.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    }
    
})

export const {resetCurrentUser} = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser.user
export default currentUserSlice.reducer