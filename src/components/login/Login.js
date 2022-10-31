import React from "react";
import './Login.css'

function Login() {
    return(
        <div className="login_container">
            <form method="post">               
                <div className="uname_container">
                    <label for="uname"><b>Email Address</b></label>
                    <input type="text" placeholder="Enter Email Address" name="uname" required/>
                </div>
                <div className="psw_container">
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login