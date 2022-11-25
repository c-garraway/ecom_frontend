
import {store} from './app/store'

/* export const CalcCartTotal = async () => {

    const cartItems = store.getState().cartItems.items
    let cartTotal = 0

    const cartPriceTotal = async () => {
        await cartItems.map(item => {
            const price = +item.price
            cartTotal += price
            return cartTotal
        })
    }

    cartPriceTotal()
    console.log(cartTotal)
    return cartTotal
} */

export const calcOrderTotals = async () => {
    console.log('calcOrder Running...')

    const orderItems = store.getState().orderItems.items
        let orderTotal = 0
        
        const orderPriceTotal = async () => {
            await orderItems.map(item => {
                const price = +item.price
                orderTotal += price
                return orderTotal
            })
        }
        await orderPriceTotal()
        console.log(orderTotal)
        const orderPriceGrandTotal= () => {
            const tax = orderTotal *.13 //hard coded for now
            const gTotal = orderTotal + tax
            console.log(tax, gTotal)
            return gTotal
        }
        orderPriceGrandTotal()
}