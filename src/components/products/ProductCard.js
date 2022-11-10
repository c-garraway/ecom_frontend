import React from "react";
import { useNavigate } from "react-router-dom";
import './ProductCard.css'
import { addCartItem, loadCartItems  } from '../../features/cart/cartItemsSlice'
import { selectCartID, createCartID, updateCartTotal } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../../features/users/currentUserSlice'

function ProductCard({productID, productName, productDescription, productPrice}) {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const cartId = useSelector(selectCartID)
    const navigate = useNavigate()

    const handleAddClick = async () => {
        if(user.length < 1) {
            navigate('/login')
        } else {
            if(cartId.length < 1) {
                await dispatch(createCartID(user.id))
                await dispatch(addCartItem({cartID: cartId[0].id, productID: productID, quantity: 1}))
                await dispatch(loadCartItems(user.id))
            } else {
                await dispatch(addCartItem({cartID: cartId[0].id, productID: productID, quantity: 1}))
                await dispatch(updateCartTotal(user.id))
                await dispatch(loadCartItems(user.id))
            }
            
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
                {/* <button type="button" className="rem_btn">Favorite</button> */}
            </div>
        </div>
    );
}

export default ProductCard;
