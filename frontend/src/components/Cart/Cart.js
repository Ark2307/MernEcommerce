import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

import { addToCart, removeFromCart } from "../../actions/orderActions";

import "./Cart.scss";
import Items from "./Items";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleOrder = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cart">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Total Cost</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <Items item={item} deleteItem={deleteItem} />

                  <div className="cartInput">
                    <button
                      onClick={decreaseQuantity(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={increaseQuantity(
                        item.product,
                        item.quantity,
                        item.stock
                      )}
                    >
                      +
                    </button>
                  </div>

                  <p className="totalPrice">{`Rs.${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="grossTotal">
              <div className="empty" />

              <div className="grossTotalBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div className="empty" />

              <div className="checkOutButton">
                <button onClick={handleOrder}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default Cart;
