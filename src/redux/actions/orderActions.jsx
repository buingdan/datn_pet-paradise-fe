import OrderService from "../../services/orderService";
import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET, ORDERS_SET, ORDER_SET, ORDER_SET_PAGEABLE, ORDER_STATE_CLEAR, ORDER_UPDATE } from "./actionTypes";


export const getOrders = () => async (dispatch) => {
  const service = new OrderService();

  try {
    console.log("get users: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getOrders();

    if (response.status === 200) {
      dispatch({
        type: ORDERS_SET,
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
export const clearOrderState = () => async (dispatch) => {
  dispatch({ type: ORDER_STATE_CLEAR });
};

export const updateOrder = (id, user) => async (dispatch) => {
  const service = new OrderService();

  try {
    console.log("update product: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateOrder(id, user);

    if (response.status === 201) {
      dispatch({
        type: ORDER_SET,
        payload: response.data,
      });

      dispatch({
        type: ORDER_UPDATE,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Đặt hàng đã được cập nhật!",
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

export const getOrdersByUserName = (params) => async (dispatch) => {
  const service = new OrderService();

  try {

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getOrdersByUserName(params);

    if (response.status === 200) {
      dispatch({
        type: ORDERS_SET,
        payload: response.data.list,
      });
      const {currentPage, totalRecord} = response.data
      console.log(">>>check currentPage",currentPage);
      console.log(">>>check totalRecord",totalRecord);
      const pagination = {
        currentPage: currentPage,
        totalRecord: totalRecord
      }
      dispatch({
        type: ORDER_SET_PAGEABLE,
        payload: pagination
      })
      console.log(">>>check pagination", pagination);
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    
    console.log(">>check respone get all", response);
  } catch (error) {
    console.log("Error" + error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
}
