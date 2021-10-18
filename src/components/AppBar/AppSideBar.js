import React, { useRef, useState } from 'react';
import { Badge, Collapse, InputAdornment, Slide, Snackbar, TextField } from '@material-ui/core';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, FavoriteBorderOutlined, LocalMallOutlined, SearchOutlined } from '@material-ui/icons';
import Auth from '../Auth/AuthDialog';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { storeProduct } from '../../actions';

const AppSideBar = ({ setIsLogged, setOpen, open }) => {
    const cartDetails = useSelector(state => state.cart);
    const userDetails = useSelector(state => state.user);
    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(true);
    const timer = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const sortBy = (e) => {
        e.preventDefault();
        const results = products.filter(product => product.description == "Chaussure de basketball");
        dispatch(storeProduct(results));
    }

    const handleClose = () => {
        setLoggedIn(false);
    }

    return (
        <div className="appbar">
            {userDetails.length != 0 &&
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  open={loggedIn} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        <AlertTitle>Connecté avec succès</AlertTitle>
                        <strong>{userDetails.first_name}</strong>, Bienvenue.
                    </Alert>
                </Snackbar>
            }
            <div className="auth-bar">
                <div className="infos-utils">
                    <div> Aide </div>
                    <div> Rejoignez-nous </div>
                    <div onClick={handleClickOpen}>{userDetails.length == 0 ? "S'identifier" : "Se déconnecter"}  </div>
                </div>
            </div>
            <div className="nav-bar">
                <div className="item-left">SNKRS</div>
                <div className="items-center">
                    <div><Link to='/' id="home">Accueil</Link></div>
                    <div><Link to='/' id="home" onClick={sortBy}>Hommes</Link></div>
                    <div><Link to='/' id="home">Femmes</Link></div>
                    <div><Link to='/' id="home">Enfans</Link></div>
                    {/* <div>Hommes</div>
                    <div>Femmes</div>
                    <div>Enfants</div> */}
                    <div>Promotions</div>
                    <div>Collections</div>
                </div>
                <div className="items-right">
                    <div className="searchBox">
                        <TextField
                            id="outlined-search"
                            type="search"
                            variant="outlined"
                            placeholder="Rechercher"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="items-right-icon">
                        <Badge badgeContent={2} className="icon-favorites" variant="dot" color="secondary-light">
                            <FavoriteBorderOutlined />
                        </Badge>
                        <Badge badgeContent={cartDetails.length} className="icon-bag" color="secondary">
                            <Link className="link-bag" to="/shopping-cart"><LocalMallOutlined /></Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="infos-covid">
                <div className="covid">
                    <div className="icon"><ArrowBackIosOutlined /></div>
                    <div className="covid-content">Covid: Informations concernant les magasins et livraisons<br /><a href="#">En savoir plus</a></div>
                    <div className="icon"><ArrowForwardIosOutlined /></div>
                </div>
            </div>
            <Auth setOpen={setOpen} open={open} setIsLogged={setIsLogged} />

        </div>
    )
}

export default AppSideBar;