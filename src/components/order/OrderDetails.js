import React from "react";
import { useSelector } from "react-redux";
import { selectOrder } from "../../features/order/orderSlice";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import './OrderItemCard.css'

function OrderDetails() {
    const user = useSelector(selectCurrentUser)
    const order = useSelector(selectOrder)


  return (
    <div className="od_container">
        <h3>Order Details</h3>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Address: {user.address}</p>
        <div>
            <p>Sub-Total: ${order.order.total}</p>
            <p>Tax: ${order.order.tax}</p>
            <p>Shipping: ${order.order.shipping}</p>
            <p>Grand-Total: ${order.order.grand_total}</p>
        </div>

    </div>
  )
}

export default OrderDetails;
