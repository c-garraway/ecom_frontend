import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import './ProductCardList.css'
import { useSelector, useDispatch  } from 'react-redux'
import {loadAllProducts} from '../../features/search/searchAllProducts'
import {selectAllProducts} from '../../features/search/searchAllProducts'



export default function ProductCardList() {
    
    const dispatch = useDispatch();

    //dispatch(loadAllProducts())
    

    useEffect (() => {
        dispatch(loadAllProducts())
    }, [dispatch])

    
    const products = useSelector(selectAllProducts)
    console.log(products)
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

/* let allProducts = [{productName: 'p1', productDescription: 'p1_description', productPrice: 5.99}, {productName: 'p2', productDescription: 'p2_description', productPrice: 19.99}, {productName: 'p3', productDescription: 'p3_description', productPrice: 119.99}] */

/*     useEffect (() => {
        const loadProducts = () => {
            for (const item in searchResults) {
                dispatch(addProduct({
                    name: item.name,
                    description: item.description,
                    price: item.price
                }))
            }
            
        } 
        if(searchResults === undefined) {
            return;
        }   
        loadProducts();
    }, [dispatch, searchResults]) */