/* import env from "react-dotenv"; */

export const baseURL = 'http://192.168.86.57:4000'


// cartItem functions
export const addCartItem = async (callData) => {
    const {cartID, productID, quantity} = callData
    const response = await fetch(`${baseURL}/cartitems`, {
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
    const response = await fetch(`${baseURL}/cartitems/${cartItemID}`, {
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
    const response = await fetch(`${baseURL}/carts`, {
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
    const response = await fetch(`${baseURL}/carts/user/${userID}`, {
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
    const response = await fetch(`${baseURL}/orderitems`, {
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
    const response = await fetch(`${baseURL}/orderitems/${cartItemID}`, {
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
    const response = await fetch(`${baseURL}/orders`, {
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
    const response = await fetch(`${baseURL}/orders/user/${userID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            } 
        })
        const json = await response.json();
        return json
}