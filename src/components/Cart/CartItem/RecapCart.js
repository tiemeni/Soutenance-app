import React, { useEffect } from 'react';
import { Divider, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { processTotalPrice } from '../../../utils';

const RecapCart = ({ subTotal, setOpen }) => {
    const amount = useSelector(state => state.panelForPay.amount)
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
                    {amount} Fcfa
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
                    {amount + fraisLiv} Fcfa
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