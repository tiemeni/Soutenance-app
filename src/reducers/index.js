import productReducer from "./products";
import cartReducer from "./cart";
import ActualUser from "./ActualUser";
import userReducer from "./users";
import { combineReducers } from 'redux';
import hommeProducts from "./homeProducts";
import femmeProducts from "./femmeProducts";
import userPanel from "./userPanel";
import panier from './panier'

const reducers = combineReducers({
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    hommeProducts,
    femmeProducts,
    ActualUser,
    userPanel,
    panier
});

export default reducers;