import React from "react";
import './ProductCard.css'

function ProductCard({productName, productDescription, productPrice}) {
    return (
        <div className="pc_container">
            <p>{productName}</p>
            <p>{productDescription}</p>
            <p>{productPrice}</p>
        </div>
        
    );
}

export default ProductCard;
