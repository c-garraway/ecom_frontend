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
        <p>Name: <span className="bold">{user.first_name} {user.last_name}</span></p>
        <p>Address: <span className="bold">{user.address}</span></p>
        <div>
            <p>Sub-Total: <span className="bold">${order.order.total}</span></p>
            <p>Tax: <span className="bold">${order.order.tax}</span></p>
            <p>Shipping: <span className="bold">${order.order.shipping}</span></p>
            <p>Grand-Total: <span className="bold">${order.order.grand_total}</span></p>
        </div>
    </div>
  )
}

export default OrderDetails;
