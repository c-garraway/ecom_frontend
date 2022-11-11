import React, { useState } from "react";
import './Users.css'
import { useDispatch } from 'react-redux'
import {addUser} from '../../features/users/currentUserSlice'
import { loadCartItems } from '../../features/cart/cartItemsSlice'
import { loadCart } from '../../features/cart/cartSlice'
import { useNavigate } from "react-router-dom";
import { createCart } from '../../utilities'


function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch() 
    const navigate = useNavigate()
   
    const loginUser = async (email, password) => {

        const response = await fetch('http://127.0.0.1:4000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email_address": `${email}`,
                "password": `${password}`
            }),  
        })
        const user = await response.json();
        
        if(user.message) {
            setMessage(user.message)
            setEmail('')
            setPassword('')
            return
        } else {
            dispatch(addUser(user))
            return user
            
        }
        
    }
    
        
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const user = await loginUser(email, password)
        
        if (user === undefined) {
            return
        }   else {
            try {
                const checkCart = await dispatch(loadCart(user.id))
                if(checkCart.payload.message) {
                    await createCart(user.id)
                }
                await dispatch(loadCart(user.id))
                dispatch(loadCartItems(user.id))
                
                
            } catch (error) {
                console.log(error)
            }
            
            setEmail('')
            setPassword('')
            navigate('/') 
        }
                
    }

    

    return(
        <div className="login_container">
            <form onSubmit={handleSubmit}>               
                <div className="email_container">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email Address" name="email"
                        value={email}
                        onChange={(e) => {setEmail(e.currentTarget.value); setMessage('')}}
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
                    <button type="submit">Login</button>
                    <p className="message_container">{message}</p>
                </div>
                
            </form>
        </div>
    )
}

export default Login