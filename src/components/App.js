import React, { useState, useEffect } from "react";
import "./App.css";
import AppSideBar from "./AppBar/AppSideBar";
import { setActualUser, storeProduct } from "../actions/";
import ShoppingCart from "./Cart/Cart";
import Footer from "./Content/AppFooter";
import AppContent from "./Content/AppContent";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetails from "./Products/ProductDetails";
import { Alert } from "@mui/material";
import Favorite from "./Content/Favorite";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState();
  const [cartId, setCardId] = useState();
  const dispatch = useDispatch();
  const actualUser = useSelector((state) => state.ActualUser.actualuser);
  const product = useSelector((state) => state.product);
  const alert = useSelector((state) => state.Alert[0]);

  const fetchProds = () => {
    if (actualUser) {
    } else {
      fetch("http://localhost:4000/api/products")
        .then((data) => data.json())
        .then((result) => {
          dispatch(storeProduct(result));
        })
        .catch((err) => {
        });
    }
  };

  const fetchProducts = async () => {
    console.log('jwt auth call ...')
    fetch("http://localhost:4000/jwt", {
      // credentials: "include",
    })
      .then((data) => data.json())
      .then((user) => {
        console.log(user)
        dispatch(setActualUser(user));
      })
      .catch((err) => { });
  };

  const getProducts = async () => {
    if (product) {
    } else {
      try {
        const results = await fetch("http://localhost:4000/api/products");
        const data = await results.json();
        //dispatch(storeProduct(data));
      } catch (err) {
      }
    }
  };

  useEffect(() => {
    // dispatch(setNotFound(false))
    try {
      fetchProducts();
      fetchProds();
    } catch (err) {
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <AppSideBar
            setIsLogged={setIsLogged}
            getProducts={getProducts}
            setOpen={setOpen}
            open={open}
          />
        </header>
        {alert.state !== "no-state" && (
          <Alert severity={alert.state}>{alert.content}</Alert>
        )}
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <AppContent />
            </Route>
            <Route exact path="/product/:productId">
              <ProductDetails fetchProducts={fetchProducts} setOpen={setOpen} />
            </Route>
            <Route path="/shopping-cart">
              <ShoppingCart
                setTotal={setTotal}
                total={total}
                fetchProducts={fetchProducts}
                cartId={cartId}
              />
            </Route>
            <Route exact path="/favorite">
              <Favorite />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
