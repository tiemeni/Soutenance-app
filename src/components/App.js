import React, { useState, useEffect } from 'react';
import './App.css';
import AppSideBar from './AppBar/AppSideBar';
import ShoppingCart from './Cart/Cart';
import Footer from './Content/AppFooter';
import AppContent from './Content/AppContent';
import { storeCart } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductDetails from './Products/ProductDetails';

function App() {
  const userInfos = useSelector(state => state.user);
  const [isLogged, setIsLogged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState();
  const [cartId, setCardId] = useState();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const myHeader = {
      'Content-Type': 'application/json',
      'x-access-token': userInfos.token
    }

    const results = await fetch('http://localhost:4000/api/cart', {
      headers: myHeader,
    });
    const result = await results.json();
    if (result.status == 200 && result.msg === "Cart not Found") {
      dispatch(storeCart([]));
      setTotal(0);
    }
    if (result.status == true) {
      dispatch(storeCart(result.data.items));
      setTotal(result.data.subTotal);
      setCardId(result.data._id);
    }
  }

  console.log("userToken: ", userInfos.token);
  console.log("isLogged: ", isLogged);
  useEffect(() => {
    try {
      // if (isLogged == true) {
      //   console.log("reloaded");
      // } else {
      //   console.log("Panier Vide");
      // }
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <AppSideBar setIsLogged={setIsLogged} setOpen={setOpen} open={open} />
        </header>
        <div className="app-content">
          <Switch>
            <Route exact path='/'>
              <AppContent />
            </Route>
            <Route exact path="/product/:productId" >
              <ProductDetails fetchProducts={fetchProducts} setOpen={setOpen} />
            </Route>
            <Route path='/shopping-cart'>
              <ShoppingCart setTotal={setTotal} total={total} fetchProducts={fetchProducts} cartId={cartId} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
