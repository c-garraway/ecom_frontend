import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import './Product.css'
import { useSelector, useDispatch  } from 'react-redux'
import {loadAllProducts, selectAllProducts} from '../../features/products/productsSlice'

export default function ProductCardList() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts)

    useEffect (() => {
        dispatch(loadAllProducts())
    }, [dispatch])    
    
    return ( 
        <div className="pcl_container">
            {products.map((product) => {
                return (
                    <div key={product.id}>
                        <ProductCard
                        productID={product.id}
                        productName={product.name}
                        productDescription={product.description}
                        productPrice={product.price}
                        />                    
                    </div>
                )          
            })}       
        </div>
    );
}
