import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Timer, ArrowBackIosOutlined } from '@material-ui/icons';
import Payment from '../Payment/Payment';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import RecapCart from './CartItem/RecapCart';
import { useSelector, useDispatch } from 'react-redux';
import { storeCart } from '../../actions';

const ShoppingCart = ({ setHome }) => {
    const [open, setOpen] = useState(false);
    const cartDetails = useSelector(state => state.cart);
    const [total, setTotal] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const results = await fetch('http://localhost:4000/api/cart');
                const result = await results.json();

                dispatch(storeCart(result.data.items));
                setTotal(result.data.subTotal);
            }

            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="container">
            <div className="container-details-products"><br />
                <div className="back-to-home">
                    <Link className="link" to="/"><ArrowBackIosOutlined style={{ marginRight: "20px" }} /></Link>
                </div>
                <br /><br />
                <div className="infos-livraison">
                    <h3 id="titre">Livraison gratuite pour les membres.</h3>
                    <p>Devenez Membre SNKRS pour profiter de livraisons rapides et gratuites.</p>
                </div>
                <h2 style={{ marginBottom: "20px" }}>Panier</h2>
                {cartDetails.map((detail) => <CartItem detail={detail} />)}
                <br/>
                <div className="time-out">
                    <Timer style={{ marginRight: "20px" }} />
                    <p>Plus que quelques exemplaires disponibles. Commandez vite.</p>
                </div><br /><br />
            </div>
            <RecapCart subTotal={total} setOpen={setOpen} />
            <Payment setOpen={setOpen} open={open} />
        </div>
    )
}

export default ShoppingCart;