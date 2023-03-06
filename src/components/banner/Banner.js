import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAllCartItems } from "../../features/cart/cartItemsSlice";
import { loadCart } from "../../features/cart/cartSlice";
import { loadOrder } from "../../features/order/orderSlice";
import { loginUser, selectCurrentUser } from "../../features/users/currentUserSlice";
import './Banner.css'

function Banner() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(selectCurrentUser);
    const [guestStatus, setGuestStatus] = useState();
    const email = process.env.REACT_APP_GUEST_EMAIL
    const password = process.env.REACT_APP_GUEST_PW
    
    function checkGuest() {
        if (userInfo?.first_name === "Guest") {
            setGuestStatus("guest-loggedIn")
            return;
        }
        setGuestStatus("guest-notLoggedIn")
    }

    useEffect(()=> {
        checkGuest();
    })

    async function handleGuest() {
        dispatch(loginUser({email, password}))
            .then(() => dispatch(loadCart()))
            .then(() => dispatch(loadAllCartItems()))
            .then(() => dispatch(loadOrder()))
        navigate('/products')
    }

    return(
        <div className="banner_container">
            <h2>Hi there! and welcome to the</h2>
            <h1 className="store-title">Random Online Store</h1>
            <h3 className={guestStatus}>Click <span className="guest-login" onClick={handleGuest}>HERE</span> to explore as a guest!</h3>            
        </div>
    )
}

export default Banner