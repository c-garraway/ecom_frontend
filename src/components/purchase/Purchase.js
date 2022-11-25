import React from "react";
import { useNavigate } from "react-router-dom";
import './Purchase.css'

function Purchased() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/products')
    }
    
  return (
    <div className="thankYou_container">
        <div>Successfully Completed.</div>
        <div>Thank you for your purchase!</div>
        <button
        type="button"
        onClick={handleClick}>Continue Shopping</button>        
    </div>  
  );
}

export default Purchased;
