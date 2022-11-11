import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ProductCard.css'
import { loadCartItems  } from '../../features/cart/cartItemsSlice'
import { selectCart, loadCart } from "../../features/cart/cartSlice";
/* import { createCart } from "../../utilities"; */
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from '../../features/users/currentUserSlice'
import { addCartItem, updateCart } from '../../utilities'

function ProductCard({productID, productName, productDescription, productPrice}) {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const cartId = useSelector(selectCart)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.id === undefined) {
            return
        } else {
            dispatch(loadCart(user.id))
        }
        
    }, [dispatch, user])

    const handleAddClick = async () => {
        /* let newCart = '' */
        if(user.length < 1) {
            navigate('/login')
        } else {
            /* if(cartId.length < 1) {
                newCart = await createCart(user.id)
                
            }  */
           /* console.log(newCart, cartId) */
            addCartItem({
                cartID: /* newCart !== '' ? newCart.cart.id :  */cartId.cart.id, 
                productID: productID,
                quantity: 1})
            await updateCart(user.id)
            await dispatch(loadCart(user.id))
            dispatch(loadCartItems(user.id))
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
