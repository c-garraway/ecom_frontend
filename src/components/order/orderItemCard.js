import React from "react";
import { useDispatch } from "react-redux";
import './Order.css'
import { loadOrderItems, deleteOrderItem } from '../../features/order/orderItemsSlice'
import { loadOrder, updateOrder, calcOrderTotals } from "../../features/order/orderSlice"

function OrderItemCard({orderItemID, orderItemName, orderItemDescription, orderItemQuantity, orderItemPrice}) {
    const dispatch = useDispatch()

    const handleDelClick = () => {
        dispatch(deleteOrderItem(orderItemID))
            .then(() => dispatch(loadOrder()))
            .then(() => dispatch(loadOrderItems()))
            .then(() => dispatch(calcOrderTotals()))
            .then(() => dispatch(updateOrder()))
        
    }

    return (
        <div className="oc_container">
            <p>{orderItemName}</p>
            <p className="orderItemDesc">{orderItemDescription}</p>
            <p className="orderItemsQty">Qty: {orderItemQuantity}</p>
            <p>$ {orderItemPrice}</p>
            <button 
            type="button"
            onClick={handleDelClick}
            >Remove from order</button>
        </div>
        
    );
}

export default OrderItemCard;