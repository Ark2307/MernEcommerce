import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/placeOrder";

export const addToCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemPresent = state.cartItems.find(
        (ind) => ind.product === item.product
      );

      if (isItemPresent) {
        return {
          ...state,
          cartItems: state.cartItems.map((ind) =>
            ind.product === isItemPresent.product ? item : ind
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    default:
      return state;
  }
};
