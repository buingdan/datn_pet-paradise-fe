import PromotionService from "../../services/promotionService";
import {
  PROMOTIONS_SET,
  PROMOTION_DELETE,
  PROMOTION_SET,
  PROMOTION_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  PRODUCT_SET_PAGEABLE,
} from "./actionTypes";

export const insertPromotion = (promotion, navigate) => async (dispatch) => {
  const service = new PromotionService();

  try {
    console.log(">>>thêm khuyến mãi: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertPromotion(promotion);

    if (response.status === 201) {
      dispatch({
        type: PROMOTION_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Thêm khuyến mãi thành công! ",
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(">>check respone insert", response);
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

  navigate("/admin/promotions/list");
};

export const getPromotions = () => async (dispatch) => {
  const service = new PromotionService();

  try {
    console.log("get categories: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getPromotions();

    if (response.status === 200) {
      dispatch({
        type: PROMOTIONS_SET,
        payload: response.data,
      });
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

  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const deletePromotion = (id) => async (dispatch) => {
  const service = new PromotionService();

  try {
    console.log("delete category: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deletePromotion(id);

    if (response.status === 200) {
      dispatch({
        type: PROMOTION_DELETE,
        payload: id,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone delete", response);
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

export const getPromotion = (id) => async (dispatch) => {
  const service = new PromotionService();

  try {
    console.log("get promotion: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getPromotion(id);
    if (response.status === 200) {
      dispatch({
        type: PROMOTION_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }

    console.log(">>check respone get by id", response);
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

export const updatePromotion =
  (id, promotion, navigate) => async (dispatch) => {
    const service = new PromotionService();

    try {
      console.log("delete category: ");

      dispatch({
        type: COMMON_LOADING_SET,
        payload: true,
      });

      const response = await service.updatePromotion(id, promotion);

      if (response.status === 201) {
        dispatch({
          type: PROMOTION_SET,
          payload: response.data,
        });

        dispatch({
          type: COMMON_MESSAGE_SET,
          payload: "Cập nhật khuyến mãi thành công",
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

    navigate("/admin/promotions/list");
  };
export const clearCategoryState = () => async (dispatch) => {
  dispatch({ type: PROMOTION_STATE_CLEAR });
};

export const clearPromotion = () => async (dispatch) => {
  dispatch({
    type: PROMOTION_SET,
    payload: { id: "", name: "", status: "Visible" },
  });
};

export const getPromotionsByPromotionName = (params) => async (dispatch) => {
    const service = new PromotionService();
  
    try {
      console.log("get products by name: ");
  
      dispatch({
        type: COMMON_LOADING_SET,
        payload: true,
      });
  
      const response = await service.getPromotionsByPromotionName(params);
  
      if (response.status === 200) {
        dispatch({
          type: PROMOTIONS_SET,
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
          type: PRODUCT_SET_PAGEABLE,
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