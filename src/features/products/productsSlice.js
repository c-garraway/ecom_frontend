import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return [];
}

const allProductsSlice = createSlice({
    name: 'products',
    initialState: initialState(),
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        resetProducts: () => initialState()
    },
})

export const { addProduct, resetProducts } = allProductsSlice.actions;
export const selectProducts = (state) => state.products;
export default allProductsSlice.reducer;