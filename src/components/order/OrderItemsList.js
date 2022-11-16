import React from "react";
import { useSelector } from "react-redux";
import { selectOrderItems } from "../../features/order/orderItemsSlice";
import OrderItemCard from './orderItemCard'
import './Order.css'

function OrderItems() {
    const orderItems = useSelector(selectOrderItems)
  return (
    <div className="orderItems_container">
    <h5>Order Items</h5>
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
  );
}

export default OrderItems;
