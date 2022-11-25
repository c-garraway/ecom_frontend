import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        cart: [],
        cartTotal: [],
        test: []
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

export const calcCartTotal = createAsyncThunk(
    'cart/calcCartTotal',
    async () => {

        const cartItems = store.getState().cartItems.items
        let cartTotal = 0

        const cartPriceTotal = async () => {
            await cartItems.map(item => {
                const price = +item.price
                cartTotal += price
                return cartTotal
            })
        }

        cartPriceTotal()
        console.log(cartTotal)
        return cartTotal.toFixed(2)
    }
)

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async () => {
        const id = store.getState().currentUser.user.id
        const total = store.getState().cart.cart.total
        console.log(`total: ${total}`)
        if(id) {
            const response = await fetch(`${BASE_URL}/carts/user/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "total": `${total}`
                })
            })
            const json = await response.json();
            return json
        } else {
            return
        }
    }
)

export const createCart = createAsyncThunk(
    'cart/createCart',
    async () => {
        const id = store.getState().currentUser.user.id

        try {
            const response = await fetch(`${BASE_URL}/carts`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "user_id": `${id}`
                }),  
            })
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error)
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
        },
        [createCart.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [createCart.fulfilled]: (state, action) => {
            state.cart = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [createCart.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [updateCart.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [updateCart.fulfilled]: (state, action) => {
            state.cart = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [updateCart.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [calcCartTotal.fulfilled]: (state, action) => {//TODO: complete all there
            state.cart.total = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        }
    },
    
})

export const {resetCart} = cartSlice.actions
export const selectCart = (state) => state.cart
export default cartSlice.reducer