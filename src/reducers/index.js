import productReducer from "./products";
import cartReducer from "./cart";
import userReducer from "./users";
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
});

export default reducers;