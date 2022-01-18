import React, { useState } from 'react';
import { TextField, Button, Radio, FormControlLabel } from '@material-ui/core';

const Register = ({ setLogin, setRegister }) => {

    const [genreHomme, setGenreHomme] = useState(true)
    const [genreFemme, setGenreFemme] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            first_name: nom,
            last_name : prenom,
            email_address : email,
            password,
            isAdmin : true
        }
        
        fetch("http://localhost:4000/api/users/register", {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            credentials : 'include',
            body : JSON.stringify(data)
        })
        .then(data => data.json())
        .then(user => console.log(user))
        .catch(err => console.log(err))
    }

    return (
        <div className='login-container'>
            <div className="login-header">
                <p id="sneakers">SNKRS</p>
                <p id="message">DEVENEZ MEMBRE SNKRS</p>
                <p id="message1">
                    Créez votre profil de Membre SNKRS et accédez au meilleur des produits, de l'inspiration et de la communauté SNKRS en avant-première.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="gender">
                    <FormControlLabel
                        value="homme"
                        name="homme"
                        onClick={
                            e => {
                                setGenreHomme(e.target.checked)
                                setGenreFemme(false)
                            }
                        }
                        checked={genreHomme}
                        control={<Radio />}
                        label="Homme"
                    />
                    <FormControlLabel
                        value="femme"
                        name="femme"
                        onClick={
                            e => {
                                setGenreFemme(e.target.checked)
                                setGenreHomme(false)
                            }
                        }
                        checked={genreFemme}
                        control={<Radio />}
                        label="Femme"
                    />
                </div>
                <div className="login-form">
                    <div>
                        <TextField
                            id="email"
                            onChange={e => { setEmail(e.target.value) }}
                            placeholder="Adresse e-mail"
                            name="email"
                            value={email}
                            type="email"
                            variant='outlined'
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            onChange={e => { setPassword(e.target.value) }}
                            placeholder="Mot de passe"
                            type="password"
                            value={password}
                            name="password"
                            variant='outlined'
                        />
                    </div>
                    <div>
                        <TextField
                            id="nom"
                            onChange={e => { setNom(e.target.value) }}
                            placeholder="Nom"
                            type="Text"
                            value={nom}
                            name="nom"
                            variant='outlined'
                        />
                    </div>
                    <div>
                        <TextField
                            id="prenom"
                            onChange={e => { setPrenom(e.target.value) }}
                            placeholder="Prénom"
                            type="Text"
                            value={prenom}
                            name="prenom"
                            variant='outlined'
                        />
                    </div>
                    <br />
                    <div id="another">
                        <p>En créant votre compte, vous acceptez de vous conformer à la <a href="#">Politique de confidentialité</a> et aux <a href='#'>Conditions générales</a> de SNKRS.</p>
                    </div>
                    <Button
                        id="button"
                        autoFocus
                        variant="contained"
                        type="submit"
                    >
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