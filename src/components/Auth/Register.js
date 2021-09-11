import React from 'react';
import { TextField, Button, Radio, FormControlLabel } from '@material-ui/core';

const Register = ({ setLogin, setRegister }) => {
    return (
        <div className='login-container'>
            <div className="login-header">
                <p id="sneakers">SNKRS</p>
                <p id="message">DEVENEZ MEMBRE SNKRS</p>
                <p id="message1">Créez votre profil de Membre SNKRS et accédez au meilleur des produits, de l'inspiration et de la communauté SNKRS en avant-première.</p>
            </div>
            <form>
                <div className="gender">
                    <FormControlLabel value="homme" control={<Radio />} label="Homme" />
                    <FormControlLabel value="femme" control={<Radio />} label="Femme" />
                </div>
                <div className="login-form">
                    <div><TextField id="email" placeholder="Adresse e-mail" type="email" variant='outlined' /></div>
                    <div>
                        <TextField
                            id="password"
                            placeholder="Mot de passe"
                            type="password"
                            variant='outlined'
                        />
                    </div>
                    <div><TextField id="email" placeholder="Nom" type="Text" variant='outlined' /></div>
                    <div><TextField id="email" placeholder="Prénom" type="Text" variant='outlined' /></div>
                    <br />
                    <div id="another">
                        <p>En créant votre compte, vous acceptez de vous conformer à la <a href="#">Politique de confidentialité</a> et aux <a href='#'>Conditions générales</a> de SNKRS.</p>
                    </div>
                    <Button id="button" autoFocus variant="contained">
                        Rejoignez-nous
                    </Button>
                    <p>Déjà membre ?
                        <a
                            id="register"
                            href="#"
                            onClick={() => {
                                setRegister(false);
                                setLogin(true);
                            }
                            }>
                             Se Connecter
                        </a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;