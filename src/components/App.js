import React, { useState } from 'react';
import './App.css';
import AppSideBar from './AppBar/AppSideBar';
import ShoppingCart from './Cart/Cart';
import Footer from './Content/AppFooter';
import AppContent from './Content/AppContent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppSideBar />
        </header>
        <div className="app-content">
          <Switch>
            <Route exact path='/'>
              <AppContent />
            </Route>
            <Route path='/shopping-cart'>
              <ShoppingCart />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
