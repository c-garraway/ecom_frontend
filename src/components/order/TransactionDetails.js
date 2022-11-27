import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCartItems } from "../../features/cart/cartItemsSlice";
import { calcCartTotal, updateCart } from "../../features/cart/cartSlice";
import { deleteOrderItems } from "../../features/order/orderItemsSlice";
import { selectOrder, calcOrderTotals, updateOrder } from "../../features/order/orderSlice";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import './Order.css'

function FakeTransaction() {
  const order = useSelector(selectOrder)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState('')

  
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handlePurchase = async () => {
    setProcessing('Processing...')
    await delay(4000)

    dispatch(deleteCartItems())
      .then(() => dispatch(deleteOrderItems()))
      .then(() => dispatch(calcCartTotal()))
      .then(() => dispatch(calcOrderTotals()))
      .then(() => dispatch(updateCart()))
      .then(() => dispatch(updateOrder()))
      .then(() => navigate('/successfulpurchase'))      
  }

  return (
    <div className="transactionDetails_container">
      <h3>Transaction Details (Simulation)</h3>
      <p>Payment Total: $ {order.order.grand_total}</p>
      <h3>Payment Method</h3>
      <p>Master Card </p>
      <p>Credit Card Number: 5243 37XX XXXX XXXX </p>
      <p>Security Code: **** </p>
      <p>Expiry Date: 10/25</p>
      <p>Card Holder: {user.first_name} {user.last_name}</p>
      <div>
      {order.order.grand_total < .1 ? '' :
        <button
        type="button"
        onClick={handlePurchase}
        >Confirm Purchase
        </button>}
      </div>
      <p className="processing">{processing}</p>
    </div>
  );
}

export default FakeTransaction;
