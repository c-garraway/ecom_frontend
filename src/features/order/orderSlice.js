import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {store} from '../../app/store'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        order: [],
        test: []
    };
}

export const loadOrder = createAsyncThunk(
    'order/loadOrder',
    async () => {
        const id = store.getState().currentUser.user.id

        if(id) {
            const response = await fetch(`${BASE_URL}/orders/user/${id}`)
            const json = await response.json()
            loadOrder()
            return json
        } else {
            return
        }
    }
)

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async () => {
        const id = store.getState().currentUser.user.id

        if(id){
            const response = await fetch(`${BASE_URL}/orders/user/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                } 
            })
            const json = await response.json()
            return json
        } else {
            return
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async () => {
        const id = store.getState().currentUser.user.id

        try {
            const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": `${id}`,
                "status": "pending" //TODO: Change at backend no need to include
            }),  
        })
        const json = await response.json();
        return json
        } catch (error) {
            console.log(error)
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState(),
    reducers: {
        resetOrder: () => initialState()
    },
    extraReducers: {
        [loadOrder.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadOrder.fulfilled]: (state, action) => {
            state.order = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadOrder.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [createOrder.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [createOrder.fulfilled]: (state, action) => {
            state.order = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [createOrder.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.test = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        }
    },
    
})

export const {resetOrder} = orderSlice.actions
export const selectOrder = (state) => state.order
export default orderSlice.reducer