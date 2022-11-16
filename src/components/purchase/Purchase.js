import React from "react";
import { useNavigate } from "react-router-dom";
import './Purchase.css'

function Purchased() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/products')
    }
    
  return (
    <div>
        <div>Purchase Successfully Completed!</div>
        <div>Thank you for your business.</div>
        <button
        type="button"
        onClick={handleClick}>Continue Shopping</button>
        
    </div>
  
  );
}

export default Purchased;
