import React, { useEffect } from "react";
import './Cart.css'
import { useDispatch, useSelector } from "react-redux"
import { loadCart, selectCart, calcCartTotal } from "../../features/cart/cartSlice"
import { useNavigate } from "react-router-dom";
import { calcOrderTotals, loadOrder, updateOrder } from "../../features/order/orderSlice";
import { loadOrderItems, batchAddOrderItems } from "../../features/order/orderItemsSlice";

export default function CartHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartTotal = useSelector(selectCart)

    useEffect(() => {
        dispatch(calcCartTotal())
            .then (() => dispatch(loadCart()))
        
    }, [dispatch])

    const handleCheckout = () => {
        dispatch(batchAddOrderItems())
            .then(() => dispatch(loadOrder()))    
            .then(() => dispatch(loadOrderItems()))
            .then(() => dispatch(calcOrderTotals()))
            .then(() => dispatch(updateOrder()))
            .then(() => navigate('/order'))
    }

    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Total: ${cartTotal.cart.total < .1 ? 0 : cartTotal.cart.total}</h4>

            {cartTotal.cart.total < .1 ? <h4 className="cart_empty">Shopping Cart Is Empty</h4>: 
            <button 
            type="button"
            onClick={handleCheckout}
            >Checkout</button>}            
        </div> 
    </div>
    );
}
