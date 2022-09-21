import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { offToast, setActualUser, setToast, storeUser } from "../../actions";
import { useDispatch } from "react-redux";

const Login = ({ setLogin, setRegister, setOpen, setIsLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [incorrect, setIncorrect] = useState(false);
  const timer = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    }
    if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIncorrect(false);
    try {
      const results = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email_address: email,
          password: password,
        }),
      });
      if (results.status !== 201) {
        timer.current = window.setTimeout(() => {
          setIsLoading(false);
          setIncorrect(true);
          setError([...error, "Identifiants invalides, veuillez réessayer."]);
        }, 1000);
      }

      if (results.status === 201) {
        const data = await results.json();
        timer.current = window.setTimeout(() => {
          setIsLoading(false);
          setOpen(false);
          dispatch(setToast("success", "connexion avec success ..."));
          setTimeout(() => {
            dispatch(offToast());
          }, 3000);
          dispatch(storeUser(data));
          dispatch(setActualUser(data));
          setIsLogged(true);
        }, 500);
      }
    } catch (_error) {
      console.log("Erreur: ", _error);
      setError([...error, _error])
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <p id="sneakers">SNKRS</p>
        <p id="message">
          VOTRE IDENTIFIANT POUR
          <br />
          REJOINDRE SNKRS
        </p>
        <Collapse in={incorrect}>
          <Alert severity="error">
            {error[0]}<br />
            {error[1]}
          </Alert>
        </Collapse>
      </div>
      <form className="login-form">
        <div>
          <TextField
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            variant="outlined"
            onInput={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="password"
            placeholder="Mot de passe"
            type="password"
            value={password}
            variant="outlined"
            onInput={(e) => handleChange(e)}
          />
        </div>
        <p id="forgot-password">
          <a href="#">Mot de passe oublié ?</a>
        </p>
        <div id="another">
          <p>
            En vous connectant, vous acceptez de vous conformer à la{" "}
            <a href="#">Politique de confidentialité</a> et aux{" "}
            <a href="#">Conditions générales</a> de SNKRS.
          </p>
        </div>
        <Button
          id="button"
          type="submit"
          disabled={!email || password.length < 8 ? true : false}
          autoFocus
          variant="contained"
          onClick={(e) => {
            login(e);
          }}
        >
          {isLoading ? (
            <CircularProgress style={{ color: "white" }} size={20} />
          ) : (
            "Connexion"
          )}
        </Button>
        <p>
          Vous n'êtes pas encore membre ?
          <a
            id="register"
            href="#"
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            Rejoignez nous
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
