import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_USER,
  AUTH_STATE_CLEAR,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user_name: "",
  email: "",
  user: {},
  roles: [],
  accessToken: "",
  refreshToken: "",
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user_name: payload.user_name,
        email: payload.email,
        roles: payload.user.roles,
        user: payload.user,
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token,
      };
    case AUTH_LOGOUT:
      return initialState;
    case AUTH_SET_USER:
      return {
        ...state,
        user_name: payload,
      };
    case AUTH_STATE_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
