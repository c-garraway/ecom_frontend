import React from "react";
import './CartItemCard.css'

function CartItemCard({productName, productDescription, productPrice}) {
    return (
        <div className="cc_container">
            <p>{productName}</p>
            <p>{productDescription}</p>
            <p>$ {productPrice}</p>
            <span></span>
            <button type="button">Remove from cart</button>
        </div>
        
    );
}

export default CartItemCard;