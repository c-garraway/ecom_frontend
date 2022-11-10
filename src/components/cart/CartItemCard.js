import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './CartItemCard.css'
import { deleteCartItem, loadCartItems } from '../../features/cart/cartItemsSlice'
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import { updateCartTotal } from "../../features/cart/cartSlice";

function CartItemCard({cartItemID, cartItemName, cartItemDescription, cartItemQuantity, cartItemPrice}) {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const handleDelClick = async () => {
        await dispatch(deleteCartItem(cartItemID))
        await dispatch(updateCartTotal(user.id))
        await dispatch(loadCartItems(user.id))
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