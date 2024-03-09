import UserService from "../../services/userService";
import {
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  USERS_SET,
  USER_SET,
  USER_STATE_CLEAR,
  USER_UPDATE,
} from "./actionTypes";

export const getUsers = () => async (dispatch) => {
  const service = new UserService();

  try {
    console.log("get users: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getUsers();

    if (response.status === 200) {
      dispatch({
        type: USERS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone get all user", response);
  } catch (error) {
    console.log("Error" + error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }

  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};
export const clearUserState = () => async (dispatch) => {
  dispatch({ type: USER_STATE_CLEAR });
};

export const updateUser = (id, user) => async (dispatch) => {
  const service = new UserService();

  try {
    console.log("update product: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateUser(id, user);

    if (response.status === 201) {
      dispatch({
        type: USER_SET,
        payload: response.data,
      });

      dispatch({
        type: USER_UPDATE,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Người dùng đã được cập nhật!",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone update", response);
  } catch (error) {
    console.log("Error" + error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }

  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};
