import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Checkbox,
  IconButton,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import Login from "./Login";
import Register from "./Register";

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

export default function Auth({ open, setOpen, setIsLogged }) {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const handleClose = () => {
    setLogin(true);
    setRegister(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className="dialog-box"
        fullWidth={true}
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          {login === true && (
            <Login
              setLogin={setLogin}
              setRegister={setRegister}
              setOpen={setOpen}
              setIsLogged={setIsLogged}
            />
          )}
          {register && (
            <Register
              setLogin={setLogin}
              setRegister={setRegister}
              setOpen={setOpen}
              setIsLogged={setIsLogged}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
