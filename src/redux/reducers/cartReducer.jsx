import {
  CARTS_SET,
  CART_DELETE,
  CART_SET,
  CART_STATE_CLEAR,
  CART_UPDATE,
} from "../actions/actionTypes";

const initialState = {
  cart: {},
  carts: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_SET:
      return { ...state, cart: payload };
    case CARTS_SET:
      return { ...state, carts: payload };
    case CART_DELETE:
      return {
        ...state,
        carts: state.carts.filter((item) => item.id !== payload),
      };
    case CART_STATE_CLEAR:
      return {
        cart: {},
        carts: [],
      };
    case CART_UPDATE:
    const newCart = state.carts.filter(
      (item) => item.id !== payload.id
    );
    return {
      ...state,
      products: [payload, ...newCart],
    };
    default:
      return state;
  }
};

export default cartReducer;
