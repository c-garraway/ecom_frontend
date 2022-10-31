import React from "react";
import {NavLink} from "react-router-dom"
import './NavBar.css'

function NavBar() {
    return(
        <div className="nav_container">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/products">PRODUCTS</NavLink>
            <NavLink to="/cart">CART (2)</NavLink>       
            
        </div>
    )
}

export default NavBar