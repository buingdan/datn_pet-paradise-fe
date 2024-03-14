import {
  PRODUCT_UPDATE,
    USERS_SET,
    USER_SET,
    USER_SET_PAGEABLE,
    USER_STATE_CLEAR,
  } from "../actions/actionTypes";
  
  const initialState = {
    users: [],
    user: {},
    pagination: {
      "totalRecord": 0,
      "currentPage": 1
    },
  };
  
  const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USERS_SET:
        return { ...state, users: payload };
      case USER_STATE_CLEAR:
        return {
          users: [],
        };
      case USER_SET:
      return { ...state, user: payload };
      case PRODUCT_UPDATE:
      const newUser = state.users.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        users: [payload, ...newUser],
      };
      case USER_SET_PAGEABLE:
        return { ...state, pagination: payload };
      default:
        return state;
    }
  };
  
  export default userReducer;