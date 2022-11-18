
/* export const baseURL = 'http://192.168.86.57:4000' */
const BASE_URL = process.env.REACT_APP_BASE_URL

// user functions
export const registerUser = async (fname, lname, address, email, password) => {
    //console.log(email, password)
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "first_name": `${fname}`,
            "last_name": `${lname}`,
            "address": `${address}`,
            "email_address": `${email}`,
            "password": `${password}`
        }),  
    })
    const newUser = await response.json();
    //dispatch(addUser(user))
    console.log(newUser)
    return newUser
}

export const logoutUser = async () => {
        
    const response = await fetch(`${BASE_URL}/users/logout`, {
        method: 'POST', 
    })
    const user = await response.json()
    
    console.log(user)
    /* return user */
}


// cartItem functions
export const addCartItem = async (callData) => {
    const {cartID, productID, quantity} = callData
    const response = await fetch(`${BASE_URL}/cartitems`, {
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
    const response = await fetch(`${BASE_URL}/cartitems/${cartItemID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
    const json = await response.json()
    return json
}

// cart functions
export const createCart =  async (userID) => {
    const response = await fetch(`${BASE_URL}/carts`, {
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
    const response = await fetch(`${BASE_URL}/carts/user/${userID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            } 
        })
        const json = await response.json();
        return json
}

// orderItem functions
export const addOrderItem = async (callData) => {
    const {orderID, productID, quantity} = callData
    const response = await fetch(`${BASE_URL}/orderitems`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "order_id": `${orderID}`,
            "product_id": `${productID}`,
            "quantity": `${quantity}`,
        }),  
    })
    const json = await response.json();
    return json
}


export const deleteOrderItem = async (cartItemID) => {
    const response = await fetch(`${BASE_URL}/orderitems/${cartItemID}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }  
        })
    const json = await response.json()
    return json
}

// order functions
export const createOrder =  async (callData) => {
    const {user_id, status} = callData
    const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": `${user_id}`,
                "status": `${status}`
            }),  
        })
        const json = await response.json();
        return json
}

export const updateOrder = async (userID) => {
    const response = await fetch(`${BASE_URL}/orders/user/${userID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            } 
        })
        const json = await response.json();
        return json
}