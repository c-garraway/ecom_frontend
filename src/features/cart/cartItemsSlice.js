import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        items: []
        
    };
}

export const loadCartItems = createAsyncThunk(
    'cartItems/loadCartItems',
    async (userID) => {
        
        const response = await fetch(`http://192.168.86.57:4000/cartitems/${userID}`)
        const json = await response.json();
        return json
    }
)

export const addCartItem = createAsyncThunk(
    'cartItems/addCartItem',
    async (callData) => {
        const {cartID, productID, quantity} = callData
        const response = await fetch('http://192.168.86.57:4000/cartitems', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "cart_id": `${cartID}`,
                "product_id": `${productID}`,
                "quantity": `${quantity}`,
            }),  
        })
        const json = await response.json();
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
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadCartItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadCartItems.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [addCartItem.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [addCartItem.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [addCartItem.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    },
    
})

export const {resetCartItems} = cartItemsSlice.actions
export const selectCartItems = (state) => state.cartItems.items
export default cartItemsSlice.reducer