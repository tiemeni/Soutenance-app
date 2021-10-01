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
  const [total, setTotal] = useState();
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
    }
  }

  console.log("userToken: ", userInfos.token);
  console.log("isLogged: ", isLogged);
  useEffect(() => {
    try {
      if (isLogged == true) {
        console.log("reloaded");
      } else {
        console.log("Panier Vide");
      }
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <header className="App-header">
          <AppSideBar setIsLogged={setIsLogged} />
        </header>
        <div className="app-content">
          <Switch>
            <Route exact path='/'>
              <AppContent />
            </Route>
            <Route exact path="/product/:productId" >
              <ProductDetails fetchProducts={fetchProducts} />
            </Route>
            <Route path='/shopping-cart'>
              <ShoppingCart total={total} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
