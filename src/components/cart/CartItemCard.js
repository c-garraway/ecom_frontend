import React from "react";
import { useDispatch } from "react-redux";
import './Cart.css'
import { loadAllCartItems, deleteCartItem } from '../../features/cart/cartItemsSlice'
import { loadCart, updateCart } from "../../features/cart/cartSlice"

function CartItemCard({cartItemID, cartItemName, cartItemDescription, cartItemQuantity, cartItemPrice}) {
    const dispatch = useDispatch()

    const handleDelClick = () => {
        dispatch(deleteCartItem(cartItemID))
            .then(() => dispatch(updateCart()))
            .then(() => dispatch(loadCart()))
            .then(() => dispatch(loadAllCartItems()))
    }

    return (
        <div className="cc_container">
            <p>{cartItemName}</p>
            <p className="cartItemDesc">{cartItemDescription}</p>
            <p className="cartItemsQty">Qty: {cartItemQuantity}</p>
            <p>$ {cartItemPrice}</p>
            <button 
            type="button"
            onClick={handleDelClick}
            >Remove from cart</button>
        </div>
        
    );
}

export default CartItemCard;