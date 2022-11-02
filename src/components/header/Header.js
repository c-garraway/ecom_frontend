import React from "react";
import './Header.css'
import LoginStatus from "../login/LoginStatus";


function Header() {

    return(
        <div className="head_container">
            <h1>RANDOM ONLINE STORE</h1>
            <LoginStatus />
        </div>
    )
}

export default Header