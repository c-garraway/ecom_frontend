import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard"
import './CartItemCardList.css'
import { selectCartItems, loadCartItems } from '../../features/cart/cartItemsSlice'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice";

/* let cartItems = [{id: 1, productName: 'p1', productDescription: 'p1_description', productPrice: 5.99}, {id: 2, productName: 'p2', productDescription: 'p2_description', productPrice: 19.99}]
 */
export default function CartItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)

    useEffect (() => {
        if(user.length <1) {
            return;
        } else {
            dispatch(loadCartItems(user.id))
        }
        
    }, [dispatch, user])

    const cartItems = useSelector(selectCartItems)
    
    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Items</h4>
            <span>
                <button type="button">Purchase</button>
                <h6>Total: $25.98</h6>
            </span>
            
        </div>
        {cartItems.map((item) => {
            return (
                <div key={item.id}>
                    <CartItemCard
                    productName={item.name}
                    productDescription={item.description}
                    productQuantity={item.quantity}
                    productPrice={item.price}
                    />
                </div>
            )          
        })}       
    </div>
    );
}
