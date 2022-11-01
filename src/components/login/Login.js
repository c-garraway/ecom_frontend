import React, { useState } from "react";
import './Login.css'
import { useDispatch } from 'react-redux'
import {addUser} from '../../features/users/currentUserSlice'

function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [currentUser, setCurrentUser] = useState()

    const loginUser = async (email, password) => {
        console.log(email, password)
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
        return user
    }
    const dispatch = useDispatch()
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await loginUser(email, password)
        setCurrentUser(response)
        dispatch(addUser({currentUser}))
    }

    

    return(
        <div className="login_container">
            <form onSubmit={handleSubmit}>               
                <div className="email_container">
                    <label htmlFor="email"><b>Email Address</b></label>
                    <input 
                        type="email" 
                        placeholder="Enter Email Address" name="email"
                        /* value={email} */
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required/>
                </div>
                <div className="psw_container">
                    <label htmlFor="password"><b>Password</b></label>
                    <input 
                        type="password"
                        placeholder="Enter Password" name="password"
                        /* value={password} */
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login