import React from "react";
import './CartItemCard.css'

function CartItemCard({productName, productDescription, productQuantity, productPrice}) {
    return (
        <div className="cc_container">
            <p>{productName}</p>
            <p>{productDescription}</p>
            <p>Qty {productQuantity}</p>
            <p>$ {productPrice}</p>
            <button type="button">Remove from cart</button>
        </div>
        
    );
}

export default CartItemCard;