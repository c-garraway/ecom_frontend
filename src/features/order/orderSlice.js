import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        order: []
    };
}

export const loadOrder = createAsyncThunk(
    'order/loadOrder',
    async (userID) => {
        const response = await fetch(`${BASE_URL}/orders/user/${userID}`)
        const json = await response.json();
        return json
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
        }
    },
    
})

export const {resetOrder} = orderSlice.actions
export const selectOrder = (state) => state.order
export default orderSlice.reducer