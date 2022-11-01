import { configureStore } from '@reduxjs/toolkit';
import AllProductsReducer from '../features/products/productsSlice';
import currentUserReducer from '../features/users/currentUserSlice'

export const store = configureStore({
  reducer: {
    allProducts: AllProductsReducer,
    currentUser: currentUserReducer,
  },
});
