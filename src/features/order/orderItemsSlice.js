import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createOrder} from "../../utilities";
/* import { selectCartItems } from "../cart/cartItemsSlice"; */
import { selectCurrentUser } from "../users/currentUserSlice";
import { selectOrder } from "./orderSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        items: []
        
    };
}

export const loadOrderItems = createAsyncThunk(
    'orderItems/loadOrderItems',
    async (userID) => {
        const response = await fetch(`${BASE_URL}/orderitems/user/${userID}`)
        const json = await response.json()
        return json
    }
)

export const batchLoadOrderItems = createAsyncThunk (
    'orderItems/batchLoadOrderItems',
    async ({getState}) => {

        const cartItems = getState().cartItems
        const order = useSelector(selectOrder())
        const user = useSelector(selectCurrentUser())
        console.log(cartItems)

        const checkIfOrderExist = () => {
            if (order.order.message) {
                return false
            } else {
                return true
            }
        }

        const check = checkIfOrderExist()
        if(check === false) {
            createOrder({
            user_id: user.id,
            status: 'pending'})
        }
        
        await cartItems.forEach(async item => {
            const response = await fetch(`${BASE_URL}/orderitems`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "order_id": `${order.order.id}`,
                    "product_id": `${item.productID}`,
                    "quantity": `${item.quantity}`,
                }),  
            })
            const json = await response.json();
            return json
        })
    }
)
/* export const addOrderItem = async (callData) => {
    const {orderID, productID, quantity} = callData
    const response = await fetch(`${baseURL}/orderitems`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "order_id": `${orderID}`,
            "product_id": `${productID}`,
            "quantity": `${quantity}`,
        }),  
    })
    const json = await response.json();
    return json
} */

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
        },
        [batchLoadOrderItems.pending]: (state) => {
            state.isLoadingSearchResults = true
            state.failedToLoadSearchResults = false
        },
        [batchLoadOrderItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = false
        },
        [batchLoadOrderItems.rejected]: (state) => {
            state.isLoadingSearchResults = false
            state.failedToLoadSearchResults = true
        }      
    },
})

export const {resetOrderItems} = orderItemsSlice.actions
export const selectOrderItems = (state) => state.orderItems.items
export default orderItemsSlice.reducer