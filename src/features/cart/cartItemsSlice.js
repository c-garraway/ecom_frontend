import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        items: [],
        sessionAddedItems: [],
        sessionDelItems: []
    };
}

export const loadAllCartItems = createAsyncThunk(
    'cartItems/loadAllCartItems',
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

export const addCartItem = createAsyncThunk(
    'cartItems/addCartItem',
    async(productID) => {
        const quantity = 1
        const cartID = store.getState().cart.cart.id

        if(cartID) {
            const response = await fetch(`${BASE_URL}/cartitems`, {
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
        } else {
            return
        }
    }
)

export const deleteCartItem = createAsyncThunk(
    'cartItems/deleteCartItem',
    async(cartItemID) => {
        const response = await fetch(`${BASE_URL}/cartitems/${cartItemID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
        const json = await response.json()
        return json
    }
)

export const deleteCartItems = createAsyncThunk(
    'cartItems/ deleteCartItems',
    async () => {
        const cartID = store.getState().cart.cart.id

        const response = await fetch(`${BASE_URL}/cartitems/cart/${cartID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
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
        [loadAllCartItems.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [loadAllCartItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [loadAllCartItems.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        },
        [addCartItem.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [addCartItem.fulfilled]: (state, action) => {
            //state.sessionAddedItems.push(action.payload) //temp
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [addCartItem.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        },
        [deleteCartItem.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [deleteCartItem.fulfilled]: (state, action) => {
            //state.sessionDelItems.push(action.payload) //temp
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [deleteCartItem.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        },
        [deleteCartItems.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [deleteCartItems.fulfilled]: (state, action) => {
            state.items = []
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [deleteCartItems.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        }    
    },
})

export const {resetCartItems} = cartItemsSlice.actions
export const selectCartItems = (state) => state.cartItems.items
export default cartItemsSlice.reducer