
/* const loginUser = async (email, password) => {
    //console.log(email, password)
    const response = await fetch('http://127.0.0.1:4000/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email_address": `${email}`,
            "password": `${password}`
        }),  
    })
    const user = await response.json();
    
    if(user.message) {
        setMessage(user.message)
        setEmail('')
        setPassword('')
        return
    } else {
        dispatch(addUser(user))
        dispatch(loadCartID(user.id))
        dispatch(loadCartItems(user.id))
        navigate('/')
    }
    
} */

export const addCartItem = async (callData) => {
    const {cartID, productID, quantity} = callData
    const response = await fetch('http://192.168.86.57:4000/cartitems', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "cart_id": `${cartID}`,
            "product_id": `${productID}`,
            "quantity": `${quantity}`,
        }),  
    })
    const json = await response.json();
    return json
}


export const deleteCartItem = async (cartItemID) => {
    const response = await fetch(`http://192.168.86.57:4000/cartitems/${cartItemID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
    const json = await response.json()
    return json
}

export const createCart =  async (userID) => {
    const response = await fetch('http://192.168.86.57:4000/carts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": `${userID}`
            }),  
        })
        const json = await response.json();
        return json
}

export const updateCart = async (userID) => {
    const response = await fetch(`http://192.168.86.57:4000/carts/user/${userID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            } 
        })
        const json = await response.json();
        return json
}

