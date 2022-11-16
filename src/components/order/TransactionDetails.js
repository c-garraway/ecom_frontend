import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCartItems } from "../../features/cart/cartItemsSlice";
import { selectOrder } from "../../features/order/orderSlice";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import './Order.css'

function FakeTransaction() {
  const order = useSelector(selectOrder)
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePurchase = () => {
    //TODO: reset cart to zero at database
    dispatch(resetCartItems())
    navigate('/successfulpurchase')
  }

  return (
    <div className="transactionDetails_container">
      <h3>Fake Transaction Details</h3>
      <p>Payment Total: $ {order.order.grand_total}</p>
      <h3>Payment Method</h3>
      <p>Master Card </p>
      <p>Credit Card Number: 5243 37XX XXXX XXXX </p>
      <p>Security Code: .... </p>
      <p>Expiry Date: 10/25</p>
      <p>Card Holder: {user.first_name} {user.last_name}</p>
      <div>
        <button
        type="button"
        onClick={handlePurchase}>Confirm Purchase</button>
      </div>
    </div>
  );
}

export default FakeTransaction;
