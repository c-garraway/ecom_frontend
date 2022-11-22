import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {store} from '../../app/store'


const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        items: [],
        test: []
        
    };
}

export const loadOrderItems = createAsyncThunk(
    'orderItems/loadOrderItems',
    async () => {
        const id = store.getState().currentUser.user.id

        if(id){
            const response = await fetch(`${BASE_URL}/orderitems/user/${id}`)
            const json = await response.json()
            return json
        } else {
            return
        }
    }
)

export const batchAddOrderItems = createAsyncThunk(
    'orderItems/batchAddOrderItems',
    async () => {
        const cartItems = store.getState().cartItems.items
        const order = store.getState().order.order
        console.log(cartItems, order)
        if(cartItems) {
            try {
                await cartItems.forEach(async item => {
                    const response = await fetch(`${BASE_URL}/orderitems`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "order_id": `${order.id}`,
                            "product_id": `${item.productid}`,
                            "quantity": `${item.quantity}`,
                        }),  
                    })
                    const json = await response.json();
                    return json
                })
                
            } catch (error) {
                console.log(error)
            }
        }

    }
)

export const deleteOrderItem = createAsyncThunk(
    'orderItems/deleteOrderItem',
    async (cartItemID) => {
        const response = await fetch(`${BASE_URL}/orderitems/${cartItemID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
    const json = await response.json()
    return json
    }
)

const orderItemsSlice = createSlice({
    name: 'orderItems',
    initialState: initialState(),
    reducers: {
        resetOrderItems: () => initialState()
    },
    extraReducers: {
        [loadOrderItems.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [loadOrderItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [loadOrderItems.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        },
        [batchAddOrderItems.fulfilled]: (state, action) => {
            state.test = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [deleteOrderItem.fulfilled]: (state, action) => {
            state.test = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        }       
    },
})

export const {resetOrderItems} = orderItemsSlice.actions
export const selectOrderItems = (state) => state.orderItems.items
export default orderItemsSlice.reducer