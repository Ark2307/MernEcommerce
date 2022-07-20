import React, { useEffect, useRef } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { clearErrors, createNewOrder } from "../../actions/orderActions";

import UseHelmet from "../layout/UseHelmet";
import CheckoutSteps from "./CheckoutSteps";
import "./Payment.scss";

function PaymentComponent() {
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderDetails = JSON.parse(sessionStorage.getItem("orderDetails"));

  const order = {
    addressInfo: shippingInfo,
    orderedProduct: cartItems,

    itemsPrice: orderDetails.subtotal,
    taxPrice: orderDetails.tax,
    shippingPrice: orderDetails.deliveryCharge,
    totalPrice: orderDetails.totalPrice,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount: Math.round(orderDetails.totalPrice * 100),
      };

      const { data } = await axios.post(
        "/api/check/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createNewOrder());

          navigate("/success");
        } else {
          alert.error("Payment Failed. Try again");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <UseHelmet title="Payment --ApniDukaan" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
          <Typography> Card Details</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentField" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="paymentField" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentField" />
          </div>

          <input
            type="submit"
            value={`Pay - ${orderDetails && orderDetails.totalPrice}`}
            ref={payBtn}
            className="paymentButton"
          />
        </form>
      </div>
    </>
  );
}

export default PaymentComponent;
