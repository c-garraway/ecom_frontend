import React, { useEffect } from "react";
import OrderItemCard from "./orderItemCard"
import './OrderItemCardList.css'
import { selectOrderItems, loadOrderItems } from '../../features/order/orderItemsSlice'
import { loadOrder } from "../../features/order/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice"
//import { selectOrder } from "../../features/order/orderSlice"
import { updateOrder } from "../../utilities";
import OrderDetails from './OrderDetails'

export default function OrderItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    /* const cartItems = useSelector(selectCartItems) */
    const orderItems = useSelector(selectOrderItems)
    //const order = useSelector(selectOrder)
    
    useEffect (() => {
        
        updateOrder(user.id)
        dispatch(loadOrder(user.id))
        dispatch(loadOrderItems(user.id))
    }, [user.id, dispatch])

    
    /* console.log(cartTotal, cartItems) */
    return (
    <div className="ocl_container">
        <div className="order_header">
            <h4>Order</h4>
            <OrderDetails />
            <span>
                <button type="button">Purchase</button>
                {/* <h6>Total: ${order.length < 1 ? 0 : order.order.total}</h6> */}
            </span>
            
        </div>
        <div className="orderItems_container">
            {orderItems.map((item) => {
                return (
                    <div key={item.id} >
                        <OrderItemCard
                        orderItemID={item.id}
                        orderItemName={item.name}
                        orderItemDescription={item.description}
                        orderItemQuantity={item.quantity}
                        orderItemPrice={item.price}
                        />
                    </div>
                )          
            })} 
        </div>
              
    </div>
    );
}
