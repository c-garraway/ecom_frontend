import React from "react";
import {NavLink} from "react-router-dom"
import './NavBar.css'
import { selectCartItems } from '../../features/cart/cartItemsSlice'
import { useSelector } from "react-redux"


function NavBar() {

    const cartItems = useSelector(selectCartItems)
    const numCartItems = cartItems.length
    /* console.log(numCartItems) */
    return(
        <div className="nav_container">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/products">PRODUCTS</NavLink>
            <NavLink to="/cart">CART <span className="dot">{numCartItems}</span></NavLink>       
            
        </div>
    )
}

export default NavBar