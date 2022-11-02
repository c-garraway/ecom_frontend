import React, { useEffect, useState } from "react";

import './UserProfile.css'

function userProfile() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    

    return(
        <div className="register_container">
            <form onSubmit={handleSubmit}>               
                <div className="fname_container">
                    <label htmlFor="fname"><b>First Name</b></label>
                    <input 
                        type="text" 
                        placeholder="Enter First Name" 
                        name="fname"
                        onChange={(e) => setFname(e.currentTarget.value)}
                        required/>
                </div>
                <div className="lname_container">
                    <label htmlFor="lname"><b>Last Name</b></label>
                    <input 
                        type="text" 
                        placeholder="Enter Last Name" 
                        name="lname" 
                        onChange={(e) => setLname(e.currentTarget.value)}
                        required/>
                </div>
                <div className="email_container">
                    <label htmlFor="email"><b>Email Address</b></label>
                    <input 
                        type="text" 
                        placeholder="Enter Email Address" 
                        name="email" 
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required/>
                </div>
                <div className="psw_container">
                    <label htmlFor="psw"><b>Password</b></label>
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