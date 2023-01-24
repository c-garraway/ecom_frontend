import React from "react";
import {NavLink} from "react-router-dom"
import './NavBar.css'
import { selectCartItems } from '../../features/cart/cartItemsSlice'
import { useSelector } from "react-redux"
import shoppingCart from '../../images/cart.png'

function NavBar() {
    const cartItems = useSelector(selectCartItems)
    const numCartItems = cartItems === undefined ? 0 : cartItems.length

    return(
        <div className="nav_container">
            <div>
                <NavLink 
                end
                to="/" 
                className={(navData) => "nav_link_active_" + navData.isActive }
                >HOME</NavLink>
                <NavLink 
                to="/products"
                className={(navData) => "nav_link_active_" + navData.isActive }
                >PRODUCTS</NavLink>
            </div>
            <div>
                <NavLink to="/cart"
                className={(navData) => "nav_link_active_" + navData.isActive }
                >CART <span className="dot">{numCartItems}</span></NavLink>     
            </div>
                
            
        </div>
    )
}

export default NavBar