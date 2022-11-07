import React from "react";
import {Link} from "react-router-dom";
import './Users.css'
import { selectCurrentUser } from '../../features/users/currentUserSlice'
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from '../../features/users/currentUserSlice'
import { resetCart } from '../../features/cart/cartSlice'
import { resetCartItems } from '../../features/cart/cartItemsSlice'

function LoginStatus() {
    const dispatch = useDispatch()
    const activeUser = useSelector(selectCurrentUser)
    const user = activeUser.first_name

    const logoutUser = async () => {
        
        const response = await fetch('http://127.0.0.1:4000/users/logout', {
            method: 'POST',
            /* headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), */  
        })
        const user = await response.json();
        dispatch(resetUser())
        dispatch(resetCart())
        dispatch(resetCartItems())
        console.log(user)
        return user
    }

    const handleClick = () => {
        logoutUser()
    }

    return(
        <div className="lStatus_container">
            <div>
                {user ? 
                <> 
                <h6 className="currentUser">{user}</h6>
                <Link to={'/profile'}>Profile</Link>
                <span> - </span>         
                <a 
                href="/"
                onClick={handleClick}>
                Logout
                </a>
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

export default LoginStatus