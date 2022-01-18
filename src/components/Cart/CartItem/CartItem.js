import React, { useState } from 'react';
import { CircularProgress, Divider, InputLabel, MenuItem, Select } from '@material-ui/core';

const CartItem = ({ detail, fetchProducts }) => {
    const { _id, image_url, nom_produit, description, couleur_dispo, taille_dispo } = detail.id_produit;
    const [isClicked, setIsClicked] = useState(false);
    const [size, setSize] = useState(taille_dispo);
    const [qty, setQty] = useState(detail.qte_produit);

    console.log("taille: ", size);

    // console.log(detail);

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    const handleChangeQty = (event) => {
        setQty(event.target.value);
    };

    const removeItem = async (e) => {
        e.preventDefault();
        setIsClicked(true);
        try {
            const myHeader = { 'Content-Type': 'application/json' }

            const results = await fetch('http://localhost:4000/api/cart/removeItem', {
                method: "POST",
                headers: myHeader,
                body: JSON.stringify({
                    id_produit: _id,
                    qte_produit: 0
                })
            });
            const result = await results.json();
            setIsClicked(false);
            fetchProducts();
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <main>
            <div className="cart-product-details">
                <div className="img">
                    <div className="small_image"><img src={image_url} /></div>
                    <div className="details">
                        <p style={{ color: "black" }}>{nom_produit}</p>
                        <p>{description}</p>
                        <p>{couleur_dispo}</p>
                        <div className="margin-bottom">
                            <p id="size">Taille/Pointure : {taille_dispo}</p>
                            {/* <p id="size" style={{ "display": "flex", "alignItems": "center" }} >
                                <InputLabel id="demo-simple-select-label">Taille/Pointure: </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={size}
                                    label={size}
                                    onChange={handleChangeSize}
                                >
                                    <MenuItem value={43}>43</MenuItem>
                                    <MenuItem value={42}>42</MenuItem>
                                    <MenuItem value={41}>41</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                </Select>
                            </p> */}
                            {/* <p id="size" style={{ "display": "flex", "alignItems": "center" }} >
                                <InputLabel id="demo-simple-select-label">Quantité: {" "} </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={qty}
                                    label={qty}
                                    onChange={handleChangeQty}
                                >
                                    <MenuItem value={43}>43</MenuItem>
                                    <MenuItem value={42}>42</MenuItem>
                                    <MenuItem value={41}>41</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                </Select>
                            </p> */}
                            <p id="qty">Quantité : {detail.qte_produit}</p>
                        </div>
                        <div className="cart-options">
                            <a href="#" id="size">Dépacer dans les favoris</a>
                            <a href="#" onClick={(e) => removeItem(e)}>{isClicked ? <CircularProgress style={{ color: "black" }} size={15} /> : "Supprimer"}</a>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <p style={{ color: "black" }}>{detail.total} Fcfa</p>
                </div>
            </div><br />
            <Divider /><br />
        </main>
    )
}

export default CartItem;