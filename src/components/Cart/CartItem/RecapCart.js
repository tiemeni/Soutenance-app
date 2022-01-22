import React from 'react';
import { Divider, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const RecapCart = ({ subTotal, setOpen }) => {
    const fraisLiv = 0;
    const panel = useSelector(state => state.userPanel)

    return (
        <div
            className="container-details">
            <br />
            <br />
            <h2>
                Récapitulatif
            </h2>
            <div>
                <p>
                    Sous Total
                </p>
                <p>
                    {subTotal} Fcfa
                </p>
            </div>
            <div>
                <p>
                    Frais de prise en charge et d'expédition
                </p>
                <p>
                    {fraisLiv} Fcfa
                </p>
            </div>
            <Divider
                style={{ marginBottom: "10px" }} />
            <div>
                <p>
                    Total
                </p>
                <p
                    style={{ fontWeight: "bold" }} >
                    {subTotal} Fcfa
                </p>
            </div>
            <Divider
                style={{ marginBottom: "10px" }} />
            <br />
            <Button
                id="secondPayment"
                variant="contained"
                onClick={() => setOpen(true)}
                disabled={panel.length <= 0 ? true : false}>
                Paiement
            </Button>
        </div>
    )
}

export default RecapCart;