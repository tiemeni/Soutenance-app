import React, { useEffect, useRef, useState } from 'react';
import Product from './product/Product';
import { CircularProgress } from '@material-ui/core';
import { storeProduct } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';


const Products = () => {
    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const timer = useRef();

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const results = await fetch('http://localhost:4000/api/products');
                const data = await results.json();
                timer.current = window.setTimeout(() => {
                    setIsLoading(false);
                    dispatch(storeProduct(data));
                }, 200);
            }

            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="content-body">
            {isLoading ?
                <div className="loading-product">
                    <CircularProgress id="circular-progress" />
                    <h4>Chargements...</h4>
                </div>
                : products.map((product) =>
                    <Product key={product._id} product={product} />
                )
            }
        </div>
    )
}

export default Products;