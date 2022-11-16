import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './OrderItemCard.css'
import { loadOrderItems } from '../../features/order/orderItemsSlice'
/* import { loadOrder } from "../../features/order/orderSlice" */
import { selectCurrentUser } from "../../features/users/currentUserSlice"
import { deleteOrderItem, updateOrder } from '../../utilities'
import { loadOrder } from "../../features/order/orderSlice";

function OrderItemCard({orderItemID, orderItemName, orderItemDescription, orderItemQuantity, orderItemPrice}) {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const handleDelClick = async () => {
        await deleteOrderItem(orderItemID)
        await updateOrder(user.id)
        await dispatch(loadOrder(user.id))
        dispatch(loadOrderItems(user.id))
        
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