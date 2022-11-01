import React from "react";
import {Link} from "react-router-dom";
import './Header.css'
import { selectCurrentUser } from '../../features/users/currentUserSlice'
import { useSelector } from "react-redux";


function Header() {

    const activeUser = useSelector(selectCurrentUser)
    const user = activeUser.first_name

    return(
        <div className="head_container">
            <h1>RANDOM ONLINE STORE</h1>
            <div>
                {user ? 
                <> 
                <h6 className="currentUser">{user}</h6>         
                <h6>
                <Link to={'/logout'}>Logout</Link>
                </h6>
                </>
                :
                <h6>
                <Link to={'/login'}>Login</Link>
                <span> - </span>
                <Link to={'/register'}>Register</Link>
                </h6>
                }
            </div>
        </div>
    )
}

export default Header