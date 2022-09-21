import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { CardElement } from "@stripe/react-stripe-js";
import { Alert, AlertTitle } from "@material-ui/lab";
import { calculate } from "../../utils";
import { setPanelForPay, setToast } from "../../actions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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


export default function Payment({
  open,
  setOpen
}) {
  const userDetails = useSelector((state) => state.ActualUser.actualuser);
  const [firstName, setFirstName] = useState(
    userDetails ? userDetails.first_name : " "
  );
  const panel = useSelector((state) => state.userPanel);
  const [lastName, setLastName] = useState(
    userDetails ? userDetails.last_name : " "
  );
  const [address, setAddress] = useState(
    userDetails ? userDetails.adresse : "la rue"
  );
  const user = useSelector((state) => state.ActualUser.actualuser);
  const [emailAddress, setEmailAddress] = useState(
    userDetails ? userDetails.email_address : " "
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userDetails ? userDetails.phone_number : " "
  );
  const allProds = useSelector((state) => state.product);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined)
  const dispatch = useDispatch();

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
  };

  calculate(panel, allProds);
  dispatch(setPanelForPay(panel));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(undefined)
    setIsLoading(true);
    const token = {
      firstName,
      email: emailAddress,
      lastName,
      address,
      phoneNumber,
    };
    const data = {
      token,
      panel,
    };
    fetch("http://localhost:4000/api/cart/payment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((_data) => _data.json())
      .then((res) => {
        if (res.success) {
          setTimeout(() => {
            setIsLoading(false);
            setOpen(false);
            setTimeout(() => {
              setSuccess(true);
              setTimeout(() => {
                window.location = "/";
              }, 2500);
            }, 500);
          }, 3000);
        } else {
          setError("Une Erreur est survenue lors du paiement ...");
          setIsLoading(false)
        }
      })
      .catch((_err) => console.log);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Paiement effectué avec succès</AlertTitle>
          {
            "Un email contenant les détails du paiement vous a été à l'adresse: "
          }
          <strong>{emailAddress}</strong>.
        </Alert>
      </Snackbar>
      <Dialog
        className="dialog-box"
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div>
            <h3>PAIEMENT</h3>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="payment-container">
            <div className="payment-left-container">
              <div className="left-container">
                <h4>1. OPTIONS DE LIVRAISON</h4>
                <br />
                <div className="left-container-padding">
                  <div className="flex-box">
                    <div className="flex-box-item">
                      <TextField
                        className="flex-box-item"
                        id="password"
                        placeholder="Nom"
                        type="text"
                        variant="outlined"
                        // defaultValue={userDetails.last_name}
                        value={lastName}
                        onInput={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="flex-box-item input-prenom">
                      <TextField
                        className="flex-box-item"
                        id="password"
                        placeholder="Prénom"
                        type="text"
                        variant="outlined"
                        // defaultValue={userDetails.first_name}
                        value={firstName}
                        onInput={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="normal-box">
                    <TextField
                      className="normal-box-item"
                      id="password"
                      placeholder="Adresse"
                      type="text"
                      variant="outlined"
                      // defaultValue={userDetails.adresse}
                      value={address}
                      onInput={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="flex-box">
                    <div className="flex-box-item">
                      <TextField
                        className="flex-box-item"
                        id="password"
                        placeholder="Email"
                        type="email"
                        variant="outlined"
                        // defaultValue={userDetails.email_address}
                        value={emailAddress}
                        onInput={(e) => handleChange(e)}
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
                        onInput={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="normal-box payment-box">
                    <CardElement style={CARD_OPTIONS} />
                  </div>
                  <span style={{ marginTop: "8px", color: "red" }}>{error}</span>
                  <br />
                  <div className="flex-end-box">
                    <div className="flex-end-box-item">
                      <Button
                        className="flex-end-box-item"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        {isLoading ? (
                          <CircularProgress
                            style={{ color: "white" }}
                            size={20}
                          />
                        ) : (
                          "Continuer"
                        )}
                      </Button>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
              <div className="infos-comp">
                <p>Renseignez ou Confirmez vos informations pour continuer.</p>
                <p>
                  Les commandes sont livrées dans un délai de 03 jours après la
                  validation de la commande.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
