import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import allProductsReducer from '../features/products/productsSlice'
import currentUserReducer from '../features/users/currentUserSlice'
import cartItemsReducer from '../features/cart/cartItemsSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import orderItemsReducer from '../features/order/orderItemsSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
    allProducts: allProductsReducer,
    currentUser: currentUserReducer,
    cart: cartReducer,
    cartItems: cartItemsReducer,
    order: orderReducer,
    orderItems: orderItemsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store)