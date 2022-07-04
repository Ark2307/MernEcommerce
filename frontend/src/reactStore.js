import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";

import { updateUserReducer, userReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  products: productReducer,
  productInfo: productDetailsReducer,
  user: userReducer,
  profile: updateUserReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
