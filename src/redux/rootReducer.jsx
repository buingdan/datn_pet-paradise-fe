import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer"
import commonReducer from "./reducers/commonReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    categoryReducer : categoryReducer,
    commonReducer : commonReducer,
    productReducer : productReducer,
    auth: authReducer,
})

export default rootReducer