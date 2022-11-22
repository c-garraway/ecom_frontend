import React from "react";
import './Order.css'
import OrderDetails from './OrderDetails'
import TransactionDetails from "./TransactionDetails";
import OrderItemsList from './OrderItemsList'

export default function OrderItemCardList() {
   
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
