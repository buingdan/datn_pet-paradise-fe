import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer"
import commonReducer from "./reducers/commonReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
    categoryReducer : categoryReducer,
    commonReducer : commonReducer,
    productReducer : productReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
})

export default rootReducer