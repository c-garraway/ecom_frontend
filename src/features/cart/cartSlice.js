import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        cart: []
    };
}

export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async (userID) => {
        const response = await fetch(`${BASE_URL}/carts/user/${userID}`)
        const json = await response.json();
        return json
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState(),
    reducers: {
        resetCart: () => initialState()
    },
    extraReducers: {
        [loadCart.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadCart.fulfilled]: (state, action) => {
            state.cart = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadCart.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    },
    
})

export const {resetCart} = cartSlice.actions
export const selectCart = (state) => state.cart
export default cartSlice.reducer