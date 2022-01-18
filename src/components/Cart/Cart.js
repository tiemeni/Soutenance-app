import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Timer, ArrowBackIosOutlined } from '@material-ui/icons';
import Payment from '../Payment/Payment';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import RecapCart from './CartItem/RecapCart';
import { useSelector } from 'react-redux';
import StripeContainer from '../Payment/StripeContainer';


const ShoppingCart = ({ total, success, setSuccess, fetchProducts, cartId }) => {
    const [open, setOpen] = useState(false);
    const cartDetails = useSelector(state => state.cart);

    console.log("Panier: ", cartDetails);

    return (
        <div className="container">
            <div
                className="container-details-products"><br />
                <div
                    className="back-to-home">
                    <Link
                        className="link" to="/">
                        <div style={{display : "flex"}}>
                            <ArrowBackIosOutlined style={{ marginRight: "20px" }} />
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
                <br />
                <br />
                <div
                    className="infos-livraison">
                    <h3 id="titre">
                        Livraison gratuite pour les membres.
                    </h3>
                    <p>
                        Devenez Membre SNKRS pour profiter de livraisons rapides et gratuites.
                    </p>
                </div>
                <h2
                    style={{ marginBottom: "20px" }}>
                    Panier
                </h2>
                {cartDetails.length <= 0 && <div
                    className="empty-cart">
                    <h4>
                        Vous n'avez encore aucun produit dans votre panier...
                    </h4>
                </div>}
                {cartDetails.length > 0 && cartDetails.map((detail, id) => <CartItem
                    detail={detail}
                    key = {id}
                    fetchProducts={fetchProducts}
                />)}
                <br />
                <div
                    className="time-out">
                    <Timer
                        style={{ marginRight: "20px" }} />
                    <p>
                        Plus que quelques exemplaires disponibles. Commandez vite.
                    </p>
                </div>
                <br />
                <br />
            </div>
            <RecapCart
                subTotal={total}
                setOpen={setOpen} />
            <StripeContainer
                subTotal={total}
                setOpen={setOpen}
                open={open}
                success={success}
                setSuccess={setSuccess}
                cartId={cartId}
                fetchProducts={fetchProducts} />
        </div>
    )
}

export default ShoppingCart;