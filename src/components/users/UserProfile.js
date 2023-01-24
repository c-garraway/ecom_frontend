import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import './Users.css'

function UserProfile() {

    const userInfo = useSelector(selectCurrentUser)

    return(
        <div>
            <h4 className="uProfile_header">User Profile</h4>
            <div className="uProfile_container user_form">
                <form>               
                    <div className="fname_container">
                        <label htmlFor="fname">First Name</label>
                        <input 
                            type="text"                            
                            name="fname"
                            defaultValue={userInfo.first_name}
                            required/>
                    </div>
                    <div className="lname_container">
                        <label htmlFor="lname">Last Name</label>
                        <input 
                            type="text"                            
                            name="lname" 
                            defaultValue={userInfo.last_name}
                            required/>
                    </div>
                    <div className="email_container">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="text"                            
                            name="email" 
                            defaultValue={userInfo.email_address}
                            required/>
                    </div>
                    <div className="address_container">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text"                            
                            name="address" 
                            defaultValue={userInfo.address}
                            required/>
                    </div>
                    <div className="acreated_container">
                        <label htmlFor="acreated">Account Created Date</label>
                        <input 
                            type="text"                            
                            name="acreated" 
                            defaultValue={userInfo.created_at}
                            />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfile