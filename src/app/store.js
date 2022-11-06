import { configureStore } from '@reduxjs/toolkit'
import allProductsReducer from '../features/products/productsSlice'
import currentUserReducer from '../features/users/currentUserSlice'
import cartItemsReducer from '../features/cart/cartItemsSlice'
import cartReducer from '../features/cart/cartSlice'


export const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    currentUser: currentUserReducer,
    cart: cartReducer,
    cartItems: cartItemsReducer,
  },
});
