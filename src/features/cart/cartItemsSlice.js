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

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: initialState(),
    reducers: {
        addCartItem: (state, action) => {
            state.items.push(action.payload)
        },
        resetCart: () => initialState()
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
        }
    },
    
})

export const {addCartItem, resetCart} = cartItemsSlice.actions
export const selectCartItems = (state) => state.cartItems.items;
export default cartItemsSlice.reducer;