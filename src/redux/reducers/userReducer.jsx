import {
    USERS_SET,
    USER_STATE_CLEAR,
  } from "../actions/actionTypes";
  
  const initialState = {
    users: [],
  };
  
  const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USERS_SET:
        return { ...state, users: payload };
      case USER_STATE_CLEAR:
        return {
          users: [],
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;