import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@material-ui/core';
import { Timer, ArrowBackIosOutlined } from '@material-ui/icons';
import Payment from '../Payment/Payment';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import RecapCart from './CartItem/RecapCart';
import { useSelector } from 'react-redux';


const ShoppingCart = ({ total }) => {
    const [open, setOpen] = useState(false);
    const cartDetails = useSelector(state => state.cart);

    console.log("Panier: ", cartDetails);
    
    return (
        <div className="container">
            <div className="container-details-products"><br />
                <div className="back-to-home">
                    <Link className="link" to="/"><ArrowBackIosOutlined style={{ marginRight: "20px" }} /></Link>Retour
                </div>
                <br /><br />
                <div className="infos-livraison">
                    <h3 id="titre">Livraison gratuite pour les membres.</h3>
                    <p>Devenez Membre SNKRS pour profiter de livraisons rapides et gratuites.</p>
                </div>
                <h2 style={{ marginBottom: "20px" }}>Panier</h2>
                {cartDetails.length <= 0 && <div class="empty-cart"><h4>Vous n'avez encore aucun produit dans votre panier...</h4></div>}
                {cartDetails.length > 0 && cartDetails.map((detail) => <CartItem detail={detail} />)}
                <br />
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