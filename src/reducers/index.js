import productReducer from "./products";
import cartReducer from "./cart";
import { combineReducers } from 'redux';

const reducers = combineReducers({
    cart: cartReducer,
    product: productReducer
});

export default reducers;