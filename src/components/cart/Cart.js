import React, { useEffect } from "react";
import CartItemsList from "./CartItemsList"
import './Cart.css'
import { selectCartItems, loadCartItems } from '../../features/cart/cartItemsSlice'
import { loadCart } from "../../features/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice"
import { selectCart } from "../../features/cart/cartSlice"

import { useNavigate } from "react-router-dom";
import { loadOrder, selectOrder } from "../../features/order/orderSlice";
import { loadOrderItems } from "../../features/order/orderItemsSlice";
import { createOrder, addOrderItem, updateOrder, updateCart } from "../../utilities";
import { batchLoadOrderItems } from "../../features/order/orderItemsSlice";

export default function CartItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCart)
    const order = useSelector(selectOrder)

    useEffect (() => {
        if(user.length <1) {
            return;
        } else {
            updateCart(user.id)
            dispatch(loadCart(user.id))
            dispatch(loadCartItems(user.id))
        }
        
    }, [dispatch, user])

/*     const checkIfOrderExist = () => {
        if (order.order.message) {
            return false
        } else {
            return true
        }
    }

    const batchLoadOrderItems = async () => {

        const check = checkIfOrderExist()
        if(check === false) {
            createOrder({
                user_id: user.id,
                status: 'pending'})
        }
        await cartItems.forEach(async item => {
            await addOrderItem({
                orderID: order.order.id,
                productID: item.productid,
                quantity: item.quantity
            })
        })
 
    }
 */
    const handleCheckout = () => {
        dispatch(batchLoadOrderItems())
            .then(() => updateOrder(user.id))
            /* .then(() => dispatch(loadOrder(user.id)))    
            .then(() => dispatch(loadOrderItems(user.id))) */    
        
        navigate('/order')
    }

    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Total: ${cartTotal.length < 1 ? 0 : cartTotal.cart.total}</h4>

            <button 
            type="button"
            onClick={handleCheckout}
            >Checkout</button>
        </div>
        <div className="cartItemsList">
            <CartItemsList />
        </div>     
    </div>
    );
}
