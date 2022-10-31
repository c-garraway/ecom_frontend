import React from "react";
import {Link} from "react-router-dom";
import './Header.css'

function Header() {
    return(
        <div className="head_container">
            <h1>RANDOM ONLINE STORE</h1>
            <h6>
            <Link to={'/login'}>LOGIN</Link>
            <span> - </span>
            <Link to={'/register'}>REGISTER</Link>
            </h6>
        </div>
    )
}

export default Header