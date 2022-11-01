import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import './ProductCardList.css'
import { useSelector, useDispatch  } from 'react-redux'
import {loadAllProducts, selectAllProducts} from '../../features/products/productsSlice'

export default function ProductCardList() {
    
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(loadAllProducts())
    }, [dispatch])
  
    const products = useSelector(selectAllProducts)
    
    return (
    <div className="pcl_container">
        <h4>Products</h4>
        {products.map((product) => {
            return (
                <>
                <ProductCard
                productName={product.name}
                productDescription={product.description}
                productPrice={product.price}
                />
                
                </>
            )          
        })}       
    </div>
    );
}
