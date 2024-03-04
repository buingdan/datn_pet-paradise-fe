import UserService from "../../services/userService";
import { COMMON_ERROR_SET, COMMON_LOADING_SET, USERS_SET, USER_STATE_CLEAR } from "./actionTypes";

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
  