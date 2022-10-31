import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        result: []
    };
}
export const loadAllProducts = createAsyncThunk(
    'allProducts/loadAllProducts',
    async () => {
        const response = await fetch('http://localhost:4000/products')
        const json = await response.json();
        return json
    }
)

const SearchAllProductsSlice = createSlice({
    name: 'allProducts',
    initialState: initialState(),
    extraReducers: {
        [loadAllProducts.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [loadAllProducts.fulfilled]: (state, action) => {
            state.result = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [loadAllProducts.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }
    },
    
})


export const selectAllProducts = (state) => state.allProducts.result;
export default SearchAllProductsSlice.reducer;