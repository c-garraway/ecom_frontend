import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'

const BASE_URL = 'http://127.0.0.1:4000'

const initialState = () => {
    return {
        cart: []
    };
}

export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async () => {
        const id = store.getState().currentUser.user.id
        
        if (id) {
        const response = await fetch(`${BASE_URL}/carts/user/${id}`)
        const json = await response.json();
        return json
        } else {
            return
        }
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