import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        cartID: []
        
    };
}

export const loadCartID = createAsyncThunk(
    'cart/loadCartID',
    async (userID) => {
        const response = await fetch(`http://192.168.86.57:4000/carts/${userID}`)
        const json = await response.json();
        return json
    }
)

export const createCartID = createAsyncThunk(
    'cart/createCartID',
    async (userID) => {
        
        const response = await fetch('http://192.168.86.57:4000/carts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": `${userID}`
            }),  
        })
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
        [loadCartID.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadCartID.fulfilled]: (state, action) => {
            state.cartID = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadCartID.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [createCartID.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [createCartID.fulfilled]: (state, action) => {
            state.cartID = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [createCartID.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    },
    
})

export const {resetCart} = cartSlice.actions
export const selectCartID = (state) => state.cart.cartID
export default cartSlice.reducer