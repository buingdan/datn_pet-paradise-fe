import { ORDERS_SET, ORDER_SET, ORDER_SET_PAGEABLE, ORDER_STATE_CLEAR, ORDER_UPDATE } from "../actions/actionTypes";

    
    const initialState = {
      orders: [],
      order: {},
      pagination: {
        "totalRecord": 0,
        "currentPage": 1
      },
    };
    
    const userReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        case ORDERS_SET:
          return { ...state, orders: payload };
        case ORDER_STATE_CLEAR:
          return {
            orders: [],
          };
        case ORDER_SET:
        return { ...state, order: payload };
        case ORDER_UPDATE:
        const newOrder = state.orders.filter(
          (item) => item.id !== payload.id
        );
        return {
          ...state,
          orders: [payload, ...newOrder],
        };
        case ORDER_SET_PAGEABLE:
          return { ...state, pagination: payload };
        default:
          return state;
      }
    };
    
    export default userReducer;