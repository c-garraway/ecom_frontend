import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'

const BASE_URL = 'http://127.0.0.1:4000'

const initialState = () => {
    return {
        items: []
        
    };
}

export const loadCartItems = createAsyncThunk(
    'cartItems/loadCartItems',
    async () => {
        const id = store.getState().currentUser.user.id
        
        if (id) {
        const response = await fetch(`${BASE_URL}/cartitems/user/${id}`)
        const json = await response.json()
        return json
        } else {
            return
        }
    }
)

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: initialState(),
    reducers: {
        resetCartItems: () => initialState()
    },
    extraReducers: {
        [loadCartItems.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [loadCartItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [loadCartItems.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        }    
    },
})

export const {resetCartItems} = cartItemsSlice.actions
export const selectCartItems = (state) => state.cartItems.items
export default cartItemsSlice.reducer