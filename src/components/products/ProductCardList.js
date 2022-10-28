import React from "react";
import ProductCard from "./ProductCard";
import './ProductCardList.css'

let allProducts = [{productName: 'p1', productDescription: 'p1_description', productPrice: 5.99}, {productName: 'p2', productDescription: 'p2_description', productPrice: 19.99}, {productName: 'p3', productDescription: 'p3_description', productPrice: 119.99}]

export default function ProductCardList() {
    return (
    <div className="pcl_container">
        {allProducts.map((product) => {
            return (
                <ProductCard
                productName={product.productName}
                productDescription={product.productDescription}
                productPrice={product.productPrice}
            />
            )          
        })}       
    </div>
    );
}
