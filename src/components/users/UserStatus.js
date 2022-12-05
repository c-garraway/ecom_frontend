import React from "react";
import {Link} from "react-router-dom";
import './Users.css'
import { selectCurrentUser, logoutUser, resetCurrentUser } from '../../features/users/currentUserSlice'
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from '../../features/cart/cartSlice'
import { deleteOrderItems } from '../../features/order/orderItemsSlice'
import { resetCartItems } from '../../features/cart/cartItemsSlice'
import { resetProducts } from "../../features/products/productsSlice";

function LoginStatus() {
    const dispatch = useDispatch()
    const activeUser = useSelector(selectCurrentUser)
    const user = activeUser.first_name

    const handleClick = () => {
        dispatch(deleteOrderItems())
        .then(() => dispatch(logoutUser()))
        dispatch(resetCurrentUser())
        dispatch(resetCart())
        dispatch(resetCartItems())
        dispatch(resetProducts())
    }

    return(
        <div className="user_status_container">
            {user ? 
            <div> 
                <div className="active_user">
                    <div>
                        {user}
                    </div>
                    <div className="user_links">
                        <Link to='/profile'>Profile</Link> 
                        <span className="separator"> | </span>
                        <Link to="/" onClick={handleClick}>Logout</Link>
                    </div>
                </div>
            </div> 
            :
            <div className="no_user user_links">
                <Link to='/login' >Login</Link>
                <span className="separator"> | </span>
                <Link to='/register'>Register</Link>
            </div>
            }
        </div>
    )
}

export default LoginStatus