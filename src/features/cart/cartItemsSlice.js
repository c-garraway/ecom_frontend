import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        items: []
        
    };
}

export const loadCartItems = createAsyncThunk(
    'cartItems/loadCartItems',
    async (userID) => {
        const response = await fetch(`${BASE_URL}/cartitems/user/${userID}`)
        const json = await response.json()
        return json
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