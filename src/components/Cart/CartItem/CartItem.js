import React, { useState } from 'react';
import { CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { decreasePanel, deletFromPanel, setIsDeleted } from '../../../actions';

const CartItem = ({ detail }) => {
    const [isClicked, setIsClicked] = useState(false);
    const allProds = useSelector(state => state.product)
    const specProd = Array.from(allProds).filter(prod => {
        return prod._id === detail.productId
    })[0]
    const dispatch = useDispatch()
    const removeItem = async () => {
        setIsClicked(true)
        dispatch(setIsDeleted(true))
        window.setTimeout(() => {
            dispatch(deletFromPanel(detail.productId, detail.taille))
            dispatch(decreasePanel())
            setIsClicked(false)
        }, 1000, () => {
            dispatch(setIsDeleted(false))
        }, 2000)
    }

    return (
        <main>
            <div className="cart-product-details">
                <div className="img">
                    <div className="small_image">
                        <img src={specProd ? specProd.image_url : "cool"} />
                    </div>
                    <div className="details">
                        <p style={{ color: "black" }}>
                            {specProd ? specProd.nom_produit : 'Tiemeni'}
                        </p>
                        <p>
                            {specProd ? specProd.description : 'description'}
                        </p>
                        <p>{specProd ? specProd.couleur_dispo : 'rose'}</p>
                        <div className="margin-bottom">
                            <p id="size">Taille/Pointure : {detail.taille}</p>
                            <p id="qty">Quantité : {detail.qte}</p>
                        </div>
                        <div className="cart-options">
                            <a href="#" id="size">Dépacer dans les favoris</a>
                            <a href="#" onClick={(e) => removeItem(e)}>{isClicked ? <CircularProgress style={{ color: "black" }} size={15} /> : "Supprimer"}</a>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <p style={{ color: "black" }}>{specProd ? specProd.prix_unitaire * detail.qte : 12}Fcfa</p>
                </div>
            </div><br />
            <Divider /><br />
        </main>
    )
}

export default CartItem;