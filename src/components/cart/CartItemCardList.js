import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard"
import './CartItemCardList.css'
import { selectCartItems, loadCartItems } from '../../features/cart/cartItemsSlice'
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import { selectCartID, updateCartTotal } from "../../features/cart/cartSlice";

/* let cartItems = [{id: 1, productName: 'p1', productDescription: 'p1_description', productPrice: 5.99}, {id: 2, productName: 'p2', productDescription: 'p2_description', productPrice: 19.99}]
 */
export default function CartItemCardList() {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    

    useEffect (() => {
        if(user.length <1) {
            return;
        } else {
            dispatch(updateCartTotal(user.id))
            dispatch(loadCartItems(user.id))
        }
        
    }, [dispatch, user])

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartID)

    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Items</h4>
            <span>
                <button type="button">Purchase</button>
                <h6>Total: ${cartTotal.length < 1 ? 0 : cartTotal[0].total}</h6>
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
