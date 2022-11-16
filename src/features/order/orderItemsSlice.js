import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        items: []
        
    };
}

export const loadOrderItems = createAsyncThunk(
    'orderItems/loadOrderItems',
    async (userID) => {
        const response = await fetch(`http://192.168.86.57:4000/orderitems/user/${userID}`)
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
        }    
    },
})

export const {resetOrderItems} = orderItemsSlice.actions
export const selectOrderItems = (state) => state.orderItems.items
export default orderItemsSlice.reducer