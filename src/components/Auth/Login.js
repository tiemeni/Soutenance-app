import React from 'react';
import { TextField, Button } from '@material-ui/core';

const Login = ({ setLogin, setRegister }) => {
    return (
        <div className='login-container'>
            <div className="login-header">
                <p id="sneakers">SNKRS</p>
                <p id="message">VOTRE IDENTIFIANT POUR<br />REJOINDRE SNKRS</p>
            </div>
            <form className="login-form">
                <div><TextField id="email" placeholder="Email" type="email" variant='outlined' /></div>
                <div>
                    <TextField
                        id="password"
                        placeholder="Mot de passe"
                        type="password"
                        variant='outlined'
                    />
                </div>
                <p id="forgot-password"><a href='#'>Mot de passe oublié ?</a></p>
                <div id="another">
                    <p>En vous connectant, vous acceptez de vous conformer à la <a href="#">Politique de confidentialité</a> et aux <a href='#'>Conditions générales</a> de SNKRS.</p>
                </div>
                <Button id="button" type="submit" autoFocus variant="contained">
                    connexion
                </Button>
                <p>Vous n'êtes pas encore membre ? 
                    <a
                        id="register"
                        href="#"
                        onClick={() => {
                            setLogin(false);
                            setRegister(true);
                        }
                        }>
                         Rejoignez nous
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Login;