import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartItemsSlice";
import CartItemCard from './CartItemCard'
import './Cart.css'

function CartItemsList() {
    const cartItems = useSelector(selectCartItems)
  return (
    <div className="cartItems_container">
    <h5>Cart Items</h5>
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
  );
}

export default CartItemsList;
