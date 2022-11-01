import React from "react";
import './ProductCard.css'

function ProductCard({productName, productDescription, productPrice}) {
    return (
        <div className="pc_container">
            <p>{productName}</p>
            <p>{productDescription}</p>
            <p>$ {productPrice}</p>
            <button type="button">Add to cart</button>
            <button type="button">Remove from cart</button>
        </div>
        
    );
}

export default ProductCard;
