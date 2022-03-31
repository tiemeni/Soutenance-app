import productReducer from "./products";
import cartReducer from "./cart";
import ActualUser from "./ActualUser";
import userReducer from "./users";
import { combineReducers } from "redux";
import hommeProducts from "./homeProducts";
import femmeProducts from "./femmeProducts";
import userPanel from "./userPanel";
import panier from "./panier";
import panelForPay from "./panelForPay";
import IsDelFromPanel from "./IsDelFromPanel";
import Alert from "./Alert";
import Favorite from "./Favorite";

const reducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  hommeProducts,
  femmeProducts,
  Alert,
  ActualUser,
  userPanel,
  panier,
  IsDelFromPanel,
  panelForPay,
  Favorite,
});

export default reducers;
