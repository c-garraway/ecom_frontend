import React, { useEffect } from "react";
import './Order.css'
import { loadOrderItems } from '../../features/order/orderItemsSlice'
import { loadOrder } from "../../features/order/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice"
import { updateOrder } from "../../utilities";
import OrderDetails from './OrderDetails'
import TransactionDetails from "./TransactionDetails";
import OrderItemsList from './OrderItemsList'

export default function OrderItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    
    useEffect (() => {
        
        updateOrder(user.id)
        dispatch(loadOrder(user.id))
        dispatch(loadOrderItems(user.id))
    }, [user.id, dispatch])
   
    return (
    <div className="ocl_container">
        <div className="order_header">
            <OrderDetails />
            <TransactionDetails />      
        </div>
        <div className="OrderItemsList">
            <OrderItemsList />
        </div>    
    </div>
    );
}
