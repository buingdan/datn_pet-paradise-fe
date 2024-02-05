import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_USER,
  AUTH_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
} from "./actionTypes";

import AuthService from "../../services/authService";

export const login = (email, password) => async (dispatch) => {
  const authService = new AuthService();

  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await authService.Login(email, password);

    if (response.status === 200) {
      dispatch({
        type: AUTH_LOGIN,
        payload: {
          user_name: response.data.body.user_name,
          email: response.data.body.email,
          access_token: response.data.body.access_token,
          refresh_token: response.data.body.refresh_token,
        },
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response?.data?.message || "Authentication failed",
    });

    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOGOUT,
  });
};

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: AUTH_SET_USER,
    payload: user,
  });
};

export const clearAuthState = () => async (dispatch) => {
  dispatch({
    type: AUTH_STATE_CLEAR,
  });
};
