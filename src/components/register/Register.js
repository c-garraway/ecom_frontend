import React from "react";
import './Register.css'

function Register() {
    return(
        <div className="register_container">
            <form method="post">               
                <div className="fname_container">
                    <label for="fname"><b>First Name</b></label>
                    <input type="text" placeholder="Enter First Name" name="fname" required/>
                </div>
                <div className="lname_container">
                    <label for="lname"><b>Last Name</b></label>
                    <input type="text" placeholder="Enter Last Name" name="lname" required/>
                </div>
                <div className="email_container">
                    <label for="email"><b>Email Address</b></label>
                    <input type="text" placeholder="Enter Email Address" name="email" required/>
                </div>
                <div className="psw_container">
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register