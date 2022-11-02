import React from "react";
import CartItemCard from "./CartItemCard";
import './CartItemCardList.css'

let allProducts = [{id: 1, productName: 'p1', productDescription: 'p1_description', productPrice: 5.99}, {id: 2, productName: 'p2', productDescription: 'p2_description', productPrice: 19.99}]

export default function CartItemCardList() {
    return (
    <div className="ccl_container">
        <div className="cart_header">
            <h4>Cart Items</h4>
            <span>
                <button type="button">Purchase</button>
                <h6>Total: $25.98</h6>
            </span>
            
        </div>
        {allProducts.map((item) => {
            return (
                <div key={item.id}>
                    <CartItemCard
                    productName={item.productName}
                    productDescription={item.productDescription}
                    productPrice={item.productPrice}
                    />
                </div>
            )          
        })}       
    </div>
    );
}
