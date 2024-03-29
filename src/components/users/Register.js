import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../features/users/currentUserSlice'
import { Link } from "react-router-dom";
import './Users.css'

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [address, setAddress] = useState("") 
    const dispatch = useDispatch() 
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        dispatch(registerUser({fname, lname, address, email, password})) 
        navigate('/login')
    }

    return(
        <div className="register_container user_form user_container">
            <form onSubmit={handleSubmit}>               
                <div className="fname_container">
                    <label htmlFor="fname">First Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter First Name" 
                        name="fname"
                        onChange={(e) => setFname(e.currentTarget.value)}
                        autoFocus
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
                <div className="address_container">
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        placeholder="Enter Address" 
                        name="address" 
                        onChange={(e) => setAddress(e.currentTarget.value)}
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
                <button type="submit">REGISTER</button>
                <p className="register_check">Already registered? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Register