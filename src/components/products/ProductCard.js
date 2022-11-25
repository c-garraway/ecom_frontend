import React from "react";
import { useNavigate } from "react-router-dom";
import './Product.css'
import { loadAllCartItems, addCartItem  } from '../../features/cart/cartItemsSlice'
import { loadCart, updateCart, calcCartTotal } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../../features/users/currentUserSlice'

function ProductCard({productID, productName, productDescription, productPrice}) {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const handleAddClick = () => {
        if(user.length < 1) {
            navigate('/login')
        } else {
            dispatch(addCartItem(productID))               
                .then (() => dispatch(loadCart()))
                .then (() => dispatch(loadAllCartItems()))
                .then (() => dispatch(calcCartTotal()))
                .then (() => dispatch(updateCart()))               
        }
    }
   
    return (
        <div className="pc_container">
            <div className="pt_container">
                <p>{productName}</p>
            </div>
            <div className="pr_container">               
                <p>{productDescription}</p>
                <p><b>${productPrice}</b></p>
            </div>
            <div className="pc_buttons">
                <button 
                type="button"
                onClick={handleAddClick}
                >Add to cart</button>
            </div>
        </div>
    );
}

export default ProductCard;
