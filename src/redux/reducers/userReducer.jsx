import {
  PRODUCT_UPDATE,
    USERS_SET,
    USER_SET,
    USER_STATE_CLEAR,
  } from "../actions/actionTypes";
  
  const initialState = {
    users: [],
    user: {},
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
  
      default:
        return state;
    }
  };
  
  export default userReducer;