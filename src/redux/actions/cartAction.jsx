import CartService from "../../services/cartService";
import { CARTS_SET, CART_DELETE, CART_SET, CART_STATE_CLEAR, COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET } from "./actionTypes";

export const addToCart = (cart) => async (dispatch) => {
  const service = new CartService();

  try {
    console.log(">>>thêm vào giỏ hàng: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.addToCart(cart);

    if (response.status === 201) {
      dispatch({
        type: CART_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Thêm sản phẩm vào giỏ hàng thành công! ",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(">>check respone addtocart", response);
  } catch (error) {
    console.log(error);
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

export const getItemsCart = (idUser) => async (dispatch) => {
  const service = new CartService();

  try {
    console.log("get getItemsCart: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getItemsCart(idUser);

    if (response.status === 200) {
      dispatch({
        type: CARTS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone get itemscart", response);
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

export const removeToCart = (idCart) => async (dispatch) => {
  const service = new CartService();

  try {
    console.log(">>>removeToCart: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.removeToCart(idCart);

    if (response.status === 200) {
      dispatch({
        type: CART_DELETE,
        payload: idCart,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: response.data,
      })
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone removeToCart", response);
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

export const clearCartState = () => async (dispatch) => {
  dispatch({ type: CART_STATE_CLEAR });
};
