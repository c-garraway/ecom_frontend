import React from "react";
import {Link} from "react-router-dom";
import './Users.css'
import { selectCurrentUser } from '../../features/users/currentUserSlice'
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from '../../features/users/currentUserSlice'
import { resetCart } from '../../features/cart/cartSlice'
import { resetCartItems } from '../../features/cart/cartItemsSlice'
import { resetOrder } from '../../features/order/orderSlice'
import { resetOrderItems } from '../../features/order/orderItemsSlice'

function LoginStatus() {
    const dispatch = useDispatch()
    const activeUser = useSelector(selectCurrentUser)
    const user = activeUser.first_name

    const logoutUser = async () => {
        
        const response = await fetch('http://127.0.0.1:4000/users/logout', {
            method: 'POST', 
        })
        const user = await response.json()
        
        console.log(user)
        /* return user */
    }

    const handleClick = () => {
        logoutUser()
        dispatch(resetUser())
        dispatch(resetCart())
        dispatch(resetCartItems())
        dispatch(resetOrder())
        dispatch(resetOrderItems())
    }

    return(
        <div className="lStatus_container">
                <div className="dropdown">
                    <button className="dropbtn">{user} &#x25BC;
                    
                    </button>
                    <div className="dropdown-content">
                    {user ? 
                    <div> 
                        {/* <h6 className="currentUser">{user}</h6> */}
                        <Link to={'/profile'}>Profile</Link> 
                        <a href="/" onClick={handleClick}>Logout</a>
                    </div>
                    :
                    <div>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
                    }
                </div>
            </div> 
            <div>
                
            </div>
        </div>
    )
}

export default LoginStatus