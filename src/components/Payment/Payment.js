import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Checkbox, IconButton, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Auth({ open, setOpen }) {
    const userDetails = useSelector(state => state.user);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                                                value={userDetails.last_name}
                                            />
                                        </div>
                                        <div className="flex-box-item">
                                            <TextField
                                                className="flex-box-item"
                                                id="password"
                                                placeholder="Prénom"
                                                type="text"
                                                variant='outlined'
                                                value={userDetails.first_name}
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
                                            value={userDetails.adresse}
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
                                                value={userDetails.email_address}
                                            />
                                        </div>
                                        <div className="flex-box-item">
                                            <TextField
                                                className="flex-box-item"
                                                id="password"
                                                placeholder="Numéro de téléphone"
                                                type="text"
                                                variant='outlined'
                                                value={userDetails.phone_number}
                                            />
                                        </div>
                                    </div><br />
                                    <div className="flex-end-box">
                                        <div className="flex-end-box-item">
                                            <Button className="flex-end-box-item" variant='contained'>
                                                Continuer
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
        </div>
    );
}
