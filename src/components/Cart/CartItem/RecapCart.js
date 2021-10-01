import React from 'react';
import {Divider, Button} from '@material-ui/core';

const RecapCart = ({subTotal, setOpen}) => {
    const fraisLiv = 0;

    return (
        <div className="container-details">
            <br /><br />
            <h2>Récapitulatif</h2>
            <div>
                <p>Sous Total</p>
                <p>{subTotal} XAF</p>
            </div>
            <div>
                <p>Frais de prise en charge et d'expédition</p>
                <p>{fraisLiv} XAF</p>
            </div>
            <Divider style={{ marginBottom: "10px" }} />
            <div>
                <p>Total</p>
                <p style={{ fontWeight: "bold" }} >{subTotal} XAF</p>
            </div>
            <Divider style={{ marginBottom: "10px" }} /><br />
            <Button id="payment" variant="contained" onClick={() => setOpen(true)}>Paiement</Button>
        </div>
    )
}

export default RecapCart;