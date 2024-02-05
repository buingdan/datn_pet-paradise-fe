import ProductService from "../../services/productService";
import {
  PRODUCTS_SET,
  PRODUCT_DELETE,
  PRODUCT_SET,
  PRODUCT_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  PRODUCT_APPEND,
  PRODUCT_UPDATE,
  PRODUCT_SET_PAGEABLE,
} from "./actionTypes";

export const insertProduct = (product, navigate) => async (dispatch) => {
  const service = new ProductService();

  try {
    console.log(">>>thêm sản phẩm: ", product);

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertProduct(product);

    if (response.status === 201) {
      dispatch({
        type: PRODUCT_SET,
        payload: response.data,
      });

      dispatch({
        type: PRODUCT_APPEND,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "sản phẩm đã được lưu ",
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

  navigate("/products/list");
};

export const getProducts = () => async (dispatch) => {
  const service = new ProductService();

  try {
    console.log("get products: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getProducts();

    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_SET,
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

export const getProductsByName = (params) => async (dispatch) => {
  const service = new ProductService();

  try {
    console.log("get products by name: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getProductsByName(params);

    if (response.status === 200) {
      dispatch({
        type: PRODUCTS_SET,
        payload: response.data.content,
      });

      const {size, totalPages, totalElements, pageable} = response.data

      const pagination = {
        size: size,
        page: pageable.pageNumber,
        query: params.query,
        totalPages: totalPages,
        totalElements: totalElements
      }

      dispatch({
        type: PRODUCT_SET_PAGEABLE,
        payload: pagination,
      })

      console.log(">>check pagination", pagination);
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

export const deleteProduct = (id) => async (dispatch) => {
  const service = new ProductService();

  try {
    console.log("delete product: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteProduct(id);

    if (response.status === 200) {
      dispatch({
        type: PRODUCT_DELETE,
        payload: id,
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

export const getProduct = (id) => async (dispatch) => {
  const service = new ProductService();

  try {
    console.log("get manufacturer: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getProduct(id);

    if (response.status === 200) {
      dispatch({
        type: PRODUCT_SET,
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
 
export const updateProduct = (id, product, navigate) => async (dispatch) => {
  const service = new ProductService();

console.log(">>>",product);
  try {
    console.log("update product: ");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const {id} = product
    const response = await service.updateProduct(id, product);

    if (response.status === 201) {
      dispatch({
        type: PRODUCT_SET,
        payload: response.data,
      });

      dispatch({
        type: PRODUCT_UPDATE,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Sản phẩm đã được cập nhật!",
      })
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

  navigate("/products/list")
};
export const clearProductState = () => async (dispatch) => {
  dispatch({ type: PRODUCT_STATE_CLEAR });
};

export const clearProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_SET, payload: {id:"", name:"", discount:"", image:"", price:"", quantityInStock:"", voteAverage:"", delete:""} });
  // dispatch({ type: PRODUCT_SET, payload: {id:"", name:"", discount:"", image:"", price:"", quantityInStock:"", voteAverage:"", category_id:"", delete:""} });
};