import React from "react";
import './Header.css'
import UserStatus from "../users/UserStatus";


function Header() {

    return(
        <div className="header_container">
            <h1>ROS</h1>
            <UserStatus />
        </div>
    )
}

export default Header