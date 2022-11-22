import React from "react";
import CartItemsList from "./CartItemsList"
import CartHeader from './CartHeader'
import './Cart.css'

export default function CartItemCardList() {
    
    return (
    <div className="ccl_container">
        <div className="cartHeader">
            <CartHeader />
        </div>
        <div className="cartItemsList">
            <CartItemsList />
        </div>     
    </div>
    );
}
