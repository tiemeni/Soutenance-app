import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Collapse, TextField, Checkbox, IconButton, Typography, Card, Snackbar } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Alert, AlertTitle } from '@material-ui/lab';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const CARD_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
}

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

export default function Payment({ open, setOpen, subTotal, fetchProducts, cartId }) {
    const userDetails = useSelector(state => state.user);
    const [firstName, setFirstName] = useState(userDetails.first_name);
    const [lastName, setLastName] = useState(userDetails.last_name);
    const [address, setAddress] = useState(userDetails.adresse);
    const [emailAddress, setEmailAddress] = useState(userDetails.email_address);
    const [phoneNumber, setPhoneNumber] = useState(userDetails.phone_number);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleClose = () => {
        setOpen(false);
        setSuccess(false);
    };

    const handleChange = (e) => {
        switch (e.target.placeholder) {
            case "Nom":
                setLastName(e.target.value);
                break;
            case "Prénom":
                setFirstName(e.target.value);
                break;
            case "Adresse":
                setAddress(e.target.value);
                break;
            case "Email":
                setEmailAddress(e.target.value);
                break;
            case "Numéro de téléphone":
                setPhoneNumber(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                email: emailAddress,
                name: lastName.concat(" ", firstName),
                phone: phoneNumber,
                address: {
                    city: address
                }
            }
        })

        if (!error) {
            try {
                const { id } = paymentMethod;
                console.log("email facture: ", emailAddress);
                const response = await fetch("http://localhost:4000/api/cart/payment", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: subTotal,
                        id: id,
                        user_email: emailAddress,
                        cart_id: cartId
                    })
                })
                const result = await response.json();

                console.log("result: ", result);

                if (result.success) {

                    const resp = await fetch("http://localhost:4000/api/cart/empty-cart", {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const rs = await resp.json();

                    console.log("rs: ", rs);

                    if (rs.success) {
                        console.log("Successful payment");
                        setSuccess(true);
                        setOpen(false);
                        setIsLoading(false);

                        fetchProducts();
                    }
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        } else {
            console.log(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={success} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <AlertTitle>Paiement effectué avec succès</AlertTitle>
                    {"Un email contenant les détails du paiement vous a été à l'adresse: "} <strong>{emailAddress}</strong>.
                </Alert>
            </Snackbar>
            <Dialog className="dialog-box" fullWidth={true} maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div><h3>PAIEMENT</h3></div>
                </DialogTitle>
                <DialogContent>
                    <div className="payment-container">
                        <div className="payment-left-container">
                            <div className="left-container">
                                <h4>1. OPTIONS DE LIVRAISON</h4><br />
                                <div className="left-container-padding">
                                    <div className="flex-box">
                                        <div className="flex-box-item">
                                            <TextField
                                                className="flex-box-item"
                                                id="password"
                                                placeholder="Nom"
                                                type="text"
                                                variant='outlined'
                                                // defaultValue={userDetails.last_name}
                                                value={lastName}
                                                onInput={e => handleChange(e)}
                                            />
                                        </div>
                                        <div className="flex-box-item input-prenom">
                                            <TextField
                                                className="flex-box-item"
                                                id="password"
                                                placeholder="Prénom"
                                                type="text"
                                                variant='outlined'
                                                // defaultValue={userDetails.first_name}
                                                value={firstName}
                                                onInput={e => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="normal-box">
                                        <TextField
                                            className="normal-box-item"
                                            id="password"
                                            placeholder="Adresse"
                                            type="text"
                                            variant='outlined'
                                            // defaultValue={userDetails.adresse}
                                            value={address}
                                            onInput={e => handleChange(e)}
                                        />
                                    </div>
                                    <div className="flex-box">
                                        <div className="flex-box-item">
                                            <TextField
                                                className="flex-box-item"
                                                id="password"
                                                placeholder="Email"
                                                type="email"
                                                variant='outlined'
                                                // defaultValue={userDetails.email_address}
                                                value={emailAddress}
                                                onInput={e => handleChange(e)}
                                            />
                                        </div>
                                        <div className="flex-box-item input-mask-div">
                                            <InputMask
                                                className="input-mask"
                                                placeholder="Numéro de téléphone"
                                                mask="+237\ 6 99 999 999"
                                                maskChar=" "
                                                // defaultValue={userDetails.phone_number}
                                                value={phoneNumber}
                                                onInput={e => handleChange(e)}
                                            />
                                            {/* <TextField
                                                    className="flex-box-item"
                                                    id="password"
                                                    placeholder="Numéro de téléphone"
                                                    type="text"
                                                    variant='outlined'
                                                    value={userDetails.phone_number}
                                                /> */}
                                        </div>
                                    </div>
                                    <div className="normal-box payment-box">
                                        <CardElement style={CARD_OPTIONS} />
                                    </div><br />
                                    <div className="flex-end-box">
                                        <div className="flex-end-box-item">
                                            <Button className="flex-end-box-item" variant='contained' onClick={handleSubmit}>
                                                {isLoading ? <CircularProgress style={{ color: "white" }} size={20} /> : "Continuer"}
                                            </Button>
                                        </div>
                                    </div><br />
                                </div>
                            </div>
                            <div className="infos-comp">
                                <p>Renseignez ou Confirmez vos informations pour continuer.</p>
                                <p>Les commandes sont livrées dans un délai de 03 jours après la validation de la commande.</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
