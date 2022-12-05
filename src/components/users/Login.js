import React, { useState } from "react";
import './Users.css'
import { useDispatch } from 'react-redux'
import { loginUser, resetCurrentUser } from '../../features/users/currentUserSlice'
import { loadAllCartItems } from '../../features/cart/cartItemsSlice'
import { loadCart, createCart } from '../../features/cart/cartSlice'
import { useNavigate } from "react-router-dom";
import {store} from '../../app/store'
import { loadOrder, createOrder } from "../../features/order/orderSlice";


function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch() 
    const navigate = useNavigate()
   
    const login = async () => {
        const user = dispatch(loginUser({email, password}))
            .then(() => dispatch(loadCart()))
            .then(() => dispatch(loadAllCartItems()))
            .then(() => dispatch(loadOrder()))
        return user
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault()

        await login()

        if(!checkUser()) {
            return
        } 
        
        if (!checkCart()) {
            dispatch(createCart())
        }

        if (!checkOrder()) {
            dispatch(createOrder())
        }
            navigate('/')       
    }

    const checkUser = () => {
        const message = store.getState().currentUser.user.message
        //console.log(message)
        if(message === 'Invalid credentials') {
            setMessage(message)
            setEmail('')
            setPassword('')
            dispatch(resetCurrentUser())
            return false
        } else { 
            return true
        }
    }

    const checkCart = () => {
        const cartExists = store.getState().cart.cart.id
        //console.log(cartExists)
        if(cartExists) {
            return true
        } else {
            return false
        }
    }

    const checkOrder = () => {
        const orderExists = store.getState().order.order.id
        //console.log(orderExists)
        if(orderExists) {
            return true
        } else {
            return false
        }
    }
    
    return(
        <div className="login_container user_form">
            <form onSubmit={handleSubmit}>               
                <div className="email_container">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email Address" name="email"
                        value={email}
                        onChange={(e) => {setEmail(e.currentTarget.value); setMessage('')}}
                        autoFocus
                        required/>
                </div>
                <div className="psw_container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter Password" name="password"
                        value={password}
                        onChange={(e) => {setPassword(e.currentTarget.value); setMessage('')}}
                        required/>
                </div>
                <div className="btn_msg">
                    <div>
                        <button type="submit">Login</button>
                        <p className="register_check">Not yet registered? <a href="/register">Register</a></p>
                    </div>                    
                    <p className="message_container">{message}</p>
                </div>
                
            </form>
        </div>
    )
}

export default Login