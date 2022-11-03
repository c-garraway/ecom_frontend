import React, { useState } from "react";

import './Users.css'

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    const registerUser = async (fname, lname, email, password) => {
        //console.log(email, password)
        const response = await fetch('http://127.0.0.1:4000/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": `${fname}`,
                "last_name": `${lname}`,
                "email_address": `${email}`,
                "password": `${password}`
            }),  
        })
        const newUser = await response.json();
        //dispatch(addUser(user))
        console.log(newUser)
        return newUser
    }
    
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        registerUser(fname, lname, email, password)       
    }

    return(
        <div className="register_container">
            <form onSubmit={handleSubmit}>               
                <div className="fname_container">
                    <label htmlFor="fname">First Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter First Name" 
                        name="fname"
                        onChange={(e) => setFname(e.currentTarget.value)}
                        required/>
                </div>
                <div className="lname_container">
                    <label htmlFor="lname">Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Last Name" 
                        name="lname" 
                        onChange={(e) => setLname(e.currentTarget.value)}
                        required/>
                </div>
                <div className="email_container">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="text" 
                        placeholder="Enter Email Address" 
                        name="email" 
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required/>
                </div>
                <div className="psw_container">
                    <label htmlFor="psw">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="psw" 
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register