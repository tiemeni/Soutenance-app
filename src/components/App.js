import React, { useState, useEffect } from 'react';
import './App.css';
import AppSideBar from './AppBar/AppSideBar';
import { setActualUser } from '../actions/'
import ShoppingCart from './Cart/Cart';
import Footer from './Content/AppFooter';
import AppContent from './Content/AppContent';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ProductDetails from './Products/ProductDetails';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState();
    const [cartId, setCardId] = useState();
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        fetch('http://localhost:4000/jwt', {
            credentials: 'include'
        })
            .then(data => data.json())
            .then(user => {
                dispatch(setActualUser(user))
            })
            .catch(err => console.log(err))
        }

    const getProducts = async () => {
        try {
            const results = await fetch('http://localhost:4000/api/products');
            const data = await results.json();
            //dispatch(storeProduct(data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        try {
            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <Router >
            <div className="app" >
                <header className="app-header" >
                    <AppSideBar setIsLogged={setIsLogged} getProducts={getProducts} setOpen={setOpen} open={open} />
                </header>
                <div className="app-content" >
                    <Switch >
                        <Route exact path='/' >
                            <AppContent />
                        </Route>
                        <Route exact path="/product/:productId" >
                            <ProductDetails fetchProducts={fetchProducts} setOpen={setOpen} />
                        </Route>
                        <Route path='/shopping-cart' >
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