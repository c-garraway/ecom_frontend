import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrder, selectOrder, calcOrderTotals, updateOrder } from "../../features/order/orderSlice";
import { loadOrderItems } from '../../features/order/orderItemsSlice'
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import './Order.css'

function OrderDetails() {
    const user = useSelector(selectCurrentUser)
    const order = useSelector(selectOrder)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(loadOrder())
        .then(() => dispatch(loadOrderItems()))
        .then(() => dispatch(calcOrderTotals()))
        .then(() => dispatch(updateOrder()))
    }, [dispatch])

  return (
    <div className="orderDetails_container">
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
