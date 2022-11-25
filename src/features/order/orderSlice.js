import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {store} from '../../app/store'

const BASE_URL = process.env.REACT_APP_BASE_URL

const initialState = () => {
    return {
        order: [],
        test: [] //tmp
    };
}

export const loadOrder = createAsyncThunk(
    'order/loadOrder',
    async () => {
        const id = store.getState().currentUser.user.id

        if(id) {
            const response = await fetch(`${BASE_URL}/orders/user/${id}`)
            const json = await response.json()
            loadOrder()
            return json
        } else {
            return
        }
    }
)

export const calcOrderTotals = createAsyncThunk(
    'order/calcOrderTotals',
    async () => {
    //console.log('calcOrder Running...')

        const orderItems = store.getState().orderItems.items
        let orderTotal = 0
        let tax
        let grand_total
        
        const orderPriceTotal = async () => {
            await orderItems.map(item => {
                const price = +item.price
                orderTotal += price
                return orderTotal
            })
        }
        await orderPriceTotal()
        //console.log(orderTotal)
        
        const orderPriceGrandTotal= async () => {
            tax = orderTotal *.13 //hard coded for now
            grand_total = orderTotal + tax
            //console.log(tax, grand_total)
        }
        await orderPriceGrandTotal()

        return {total: orderTotal.toFixed(2), tax: tax.toFixed(2), grand_total: grand_total.toFixed(2)}

    }
)

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async () => {
        const id = store.getState().currentUser.user.id
        const order = store.getState().order.order
        

        if(id){
            const response = await fetch(`${BASE_URL}/orders/user/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "total": `${order.total}`,
                    "tax": `${order.tax}`,
                    "grand_total": `${order.grand_total}`
                }) 
            })
            const json = await response.json()
            return json
        } else {
            return
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async () => {
        const id = store.getState().currentUser.user.id

        try {
            const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": `${id}`,
                "status": "pending"
            }),  
        })
        const json = await response.json();
        return json
        } catch (error) {
            console.log(error)
        }
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
        },
        [createOrder.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [createOrder.fulfilled]: (state, action) => {
            state.order = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [createOrder.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        }, 
        [calcOrderTotals.pending]: (state) => {
            state.isLoadingSearchResults = true;
            state.failedToLoadSearchResults = false;
        },
        [calcOrderTotals.fulfilled]: (state, action) => {
            state.order.total = action.payload.total
            state.order.tax = action.payload.tax
            state.order.grand_total = action.payload.grand_total
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        },
        [calcOrderTotals.rejected]: (state) => {
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.test = action.payload
            state.isLoadingSearchResults = false;
            state.failedToLoadSearchResults = false;
        }
    },
    
})

export const {resetOrder} = orderSlice.actions
export const selectOrder = (state) => state.order
export default orderSlice.reducer