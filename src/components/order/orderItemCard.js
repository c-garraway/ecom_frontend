import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './CartItemCard.css'
import { loadOrderItems } from '../../features/cart/cartItemsSlice'
import { loadOrder } from "../../features/cart/cartSlice"
import { selectCurrentUser } from "../../features/users/currentUserSlice"
import { deleteOrderItem, updateOrder } from '../../utilities'

function OrderItemCard({orderItemID, orderItemName, orderItemDescription, orderItemQuantity, orderItemPrice}) {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const handleDelClick = async () => {
        await deleteOrderItem(orderItemID)
        await updateOrder(user.id)
        dispatch(loadOrderItems(user.id))
        dispatch(loadOrderItems(user.id))
    }

    return (
        <div className="cc_container">
            <p>{orderItemName}</p>
            <p className="cartItemDesc">{orderItemDescription}</p>
            <p className="cartItemsQty">Qty: {orderItemQuantity}</p>
            <p>$ {orderItemPrice}</p>
            <button 
            type="button"
            onClick={handleDelClick}
            >Remove from order</button>
        </div>
        
    );
}

export default OrderItemCard;