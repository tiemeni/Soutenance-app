import React, { useEffect, useRef, useState } from 'react';
import Product from './product/Product';
import { storeProduct } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { display } from '@mui/system';
import SkeletonHome from '../skeletonHome';


const Products = () => {

    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const hommeProds = useSelector(state => state.hommeProducts.hommeProds)
    const showHom = useSelector(state => state.hommeProducts.showHomme)
    const femmeProds = useSelector(state => state.femmeProducts.femmeProds)
    const showFem = useSelector(state => state.femmeProducts.showFemme)
    const timer = useRef();
    const valFilter = useSelector(state => state.hommeProducts.valForFilter)
    const filtered = products ? Array.from(products).filter(prod => {
        if (prod) {
            return prod.nom_produit.toUpperCase()
                .includes(valFilter ? valFilter.toUpperCase() : " ")
        } else {
            return;
        }
    }) : ""

    useEffect(() => {
        const fetchProducts = () => {
            fetch('http://localhost:4000/api/products')
                .then(data => data.json())
                .then(result => {
                    setIsLoading(false);
                    dispatch(storeProduct(result));
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchProducts();
    }, [])

    return (
        <div className="content-body">
            {isLoading ?
                <SkeletonHome />
                : showHom && !filtered ? Array.from(hommeProds).map((product) =>
                    <Product key={product._id} product={product} />
                ) : showHom && filtered ? (Array.from(hommeProds).filter(prod => {
                    if (prod) {
                        return prod.nom_produit.toUpperCase()
                            .includes(valFilter ? valFilter.toUpperCase() : ' ')
                    } else {
                        return;
                    }
                }).map((product) =>
                    <Product key={product._id} product={product} />))

                    : showFem && !filtered ? Array.from(femmeProds).map((product) =>
                        <Product key={product._id} product={product} />
                    ) : showFem && filtered ? (Array.from(femmeProds).filter(prod => {
                        if (prod) {
                            return prod.nom_produit.toUpperCase()
                                .includes(valFilter ? valFilter.toUpperCase() : ' ')
                        } else {
                            return;
                        }
                    }).map((product) =>
                        <Product key={product._id} product={product} />))
                        :
                        filtered ? filtered.map((product) =>
                            <Product key={product._id} product={product} />)
                            : products.map((product) =>
                                <Product key={product._id} product={product} />)
            }
        </div >
    )
}

export default Products;