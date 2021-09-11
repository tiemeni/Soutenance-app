import React from 'react';
import { Divider } from '@material-ui/core';

const CartItem = ({ detail }) => {
    const { small_image_url, nom_produit, description, couleur_dispo, taille_dispo } = detail.id_produit;
    
    return (
        <main>
            <div className="cart-product-details">
                <div className="img">
                    <div><img src={small_image_url} /></div>
                    <div className="details">
                        <p style={{ color: "black" }}>{nom_produit}</p>
                        <p>{description}</p>
                        <p>{couleur_dispo}</p>
                        <div className="margin-bottom">
                            <p id="size">Taille/Pointure : {taille_dispo}</p>
                            <p id="qty">Quantité : {detail.qte_produit}</p>
                        </div>
                        <div className="cart-options">
                            <a href="#" id="size">Dépacer dans les favoris</a>
                            <a href="#">Supprimer</a>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <p style={{ color: "black" }}>{detail.total} XAF</p>
                </div>
            </div><br />
            <Divider /><br />
        </main>
    )
}

export default CartItem;