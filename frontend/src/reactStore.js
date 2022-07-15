import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";

import {
  forgotPasswordReducer,
  updateUserReducer,
  userReducer,
} from "./reducers/userReducers";

import { addToCartReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productReducer,
  productInfo: productDetailsReducer,
  user: userReducer,
  profile: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  cart: addToCartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
