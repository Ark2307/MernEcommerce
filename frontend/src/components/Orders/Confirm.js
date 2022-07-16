import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import "./Confirm.scss";
import CheckoutSteps from "./CheckoutSteps";
import UseHelmet from "../layout/UseHelmet";

function Confirm() {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 200;

  const tax = 0.18 * subtotal;
  const totalPrice = deliveryCharge + tax + subtotal;

  const proceedToPayment = () => {
    const data = {
      totalPrice,
      tax,
      deliveryCharge,
      subtotal,
    };

    sessionStorage.setItem("orderDetails", JSON.stringify(data));
    navigate("/order/payment");
  };

  const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.country} , ${shippingInfo.pinCode} `;

  return (
    <>
      <UseHelmet title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div className="pageSection">
          <div className="addressArea">
            <Typography>Shipping Info</Typography>
            <div className="addressAreaBox">
              <div className="userDetails">
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="userDetails">
                <p>Phone No:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="userDetails">
                <p>Deliver At:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="cartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="cartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`product/${item.product}`}>{item.name}</Link>

                    <span>
                      {item.quantity} X Rs.{item.price} =
                    </span>
                    <p>Rs.{item.quantity * item.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="pageSectionRight">
          <div className="orderSummary">
            <Typography>ORDER SUMMARY</Typography>
            <div className="chargesTypes">
              <div>
                <p>Subtotal:</p>
                <span>Rs.{subtotal}</span>
              </div>
              <div>
                <p>Delivery Charges:</p>
                <span>Rs.{deliveryCharge}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs.{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs.{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirm;
