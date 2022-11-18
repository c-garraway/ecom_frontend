import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        products: []
    };
}

export const loadAllProducts = createAsyncThunk(
    'allProducts/loadAllProducts',
    async () => {
        const response = await fetch(`${BASE_URL}/products`)
        const json = await response.json();
        return json
    }
)

const AllProductsSlice = createSlice({
    name: 'allProducts',
    initialState: initialState(),
    extraReducers: {
        [loadAllProducts.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadAllProducts.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    },
    
})

export const selectAllProducts = (state) => state.allProducts.products;
export default AllProductsSlice.reducer;