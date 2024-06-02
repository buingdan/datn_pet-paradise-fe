import {
    PROMOTIONS_SET,
    PROMOTION_DELETE,
    PROMOTION_SET,
    PROMOTION_SET_PAGEABLE,
    PROMOTION_STATE_CLEAR,
  } from "../actions/actionTypes";
  
  const initialState = {
    promotion: {},
    promotions: [],
    pagination: {
        "totalRecord": 0,
        "currentPage": 1
      },
  };
  
  const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case PROMOTION_SET:
        return { ...state, promotion: payload };
      case PROMOTIONS_SET:
        return { ...state, promotions: payload };
      case PROMOTION_DELETE:
        return { ...state, promotions: state.promotions.filter((item) => item.id !== payload) };
      case PROMOTION_STATE_CLEAR:
        return {
            promotion: {},
            promotions: [],
        };
     case PROMOTION_SET_PAGEABLE:
        return { ...state, pagination: payload };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  