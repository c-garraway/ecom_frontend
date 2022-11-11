import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard"
import './CartItemCardList.css'
import { selectCartItems, loadCartItems } from '../../features/cart/cartItemsSlice'
import { loadCart } from "../../features/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice"
import { selectCart } from "../../features/cart/cartSlice"
import { updateCart } from "../../utilities";

export default function CartItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    

    useEffect (() => {
        if(user.length <1) {
            return;
        } else {
            updateCart(user.id)
            dispatch(loadCart(user.id))
            dispatch(loadCartItems(user.id))
        }
        
    }, [dispatch, user])

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCart)
    /* console.log(cartTotal) */
    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Items</h4>
            <span>
                <button type="button">Purchase</button>
                <h6>Total: ${cartTotal.length < 1 ? 0 : cartTotal.cart.total}</h6>
            </span>
            
        </div>
        <div className="cartItems_container">
            {cartItems.map((item) => {
                return (
                    <div key={item.id} >
                        <CartItemCard
                        cartItemID={item.id}
                        cartItemName={item.name}
                        cartItemDescription={item.description}
                        cartItemQuantity={item.quantity}
                        cartItemPrice={item.price}
                        />
                    </div>
                )          
            })} 
        </div>
              
    </div>
    );
}
