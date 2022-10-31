import { configureStore } from '@reduxjs/toolkit';
//import allProductsReducer from '../features/products/productsSlice'
import searchAllProductsReducer from '../features/search/searchAllProducts';

export const store = configureStore({
  reducer: {
    allProducts: searchAllProductsReducer,
    //allProducts: allProductsReducer
  },
});
