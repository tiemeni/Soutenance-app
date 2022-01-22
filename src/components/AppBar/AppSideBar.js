import React,
{
    useRef, useState
}
    from 'react';
import {
    Badge,
    InputAdornment,
    Snackbar,
    TextField
} from '@material-ui/core';
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
    FavoriteBorderOutlined,
    LocalMallOutlined,
    SearchOutlined
} from '@material-ui/icons';
import Auth from '../Auth/AuthDialog';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
    setFilter,
    showForFemme,
    showForHomme,
    storeFemmeProducts,
    storeHommeProducts
} from '../../actions';
import Cookies from 'js-cookie';

const AppSideBar = ({ setIsLogged, setOpen, open }) => {
    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(true);
    const size = useSelector(state => state.panier)
    const taill = useSelector(state => state.userPanel).length
    const actualUser = useSelector(state => state.ActualUser.actualuser)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDisconnect = () => {
        Cookies.remove('jwt')
        window.location = '/'
    }
    const sortByHomme = () => {
        const results = Array.from(products)
            .filter(product => product.description === "Chaussure de basketball");
        dispatch(storeHommeProducts(results))
        dispatch(showForHomme(true))
        dispatch(showForFemme(false))
        //console.log(newResults)
    }

    const sortByFemme = (e) => {
        const results_ = Array.from(products)
            .filter(product => product.description === "Chaussure pour homme");
        dispatch(storeFemmeProducts(results_))
        dispatch(showForFemme(true))
        dispatch(showForHomme(false))
    }

    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setSearch(e.target.value)
        dispatch(setFilter(e.target.value))
    }

    const showAllProducts = () => {
        dispatch(showForHomme(false))
        dispatch(showForFemme(false))
    }
    const handleClose = () => {
        setLoggedIn(false);
    }

    return (
        <div className="appbar">
            {actualUser &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={loggedIn}
                    autoHideDuration={5000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}>
                        <AlertTitle>
                            Connecté avec succès
                        </AlertTitle>
                        <strong>
                            {actualUser.first_name}
                        </strong>,
                        Bienvenue.
                    </Alert>
                </Snackbar>
            }
            <div
                className="auth-bar">
                <div
                    className="infos-utils">
                    <div>
                        Aide
                    </div>
                    {/*  <div style={{cursor : 'pointer'}}> Rejoignez-nous </div> */}
                    <div
                        onClick={!actualUser ? handleClickOpen : handleDisconnect}>
                        {!actualUser ? "S'identifier" : "Se déconnecter"}
                    </div>
                </div>
            </div>
            <div
                className="nav-bar">
                <div
                    className="item-left">
                    SNKRS
                </div>
                <div
                    className="items-center">
                    <div>
                        <Link
                            to='/'
                            id="home"
                            onClick={showAllProducts}>
                            Accueil
                        </Link>
                    </div>
                    <div>
                        <Link
                            to='/'
                            id="home"
                            onClick={sortByHomme}>
                            Homme
                        </Link>
                    </div>
                    <div>
                        <Link
                            to='/'
                            id="home"
                            onClick={sortByFemme}
                        >
                            Femme
                        </Link>
                    </div>
                    {/* <div>Hommes</div>
                    <div>Femmes</div>
                    <div>Enfants</div> */}
                    <div>
                        Promotion
                    </div>
                </div>
                <div
                    className="items-right">
                    <div
                        className="searchBox">
                        <TextField
                            id="outlined-search"
                            type="search"
                            value={search}
                            onChange={handleSearch}
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
                    <div
                        className="items-right-icon">
                        <Badge
                            badgeContent={''}
                            className="icon-favorites"
                            variant="dot"
                            color="secondary">
                            <FavoriteBorderOutlined />
                        </Badge>
                        <Badge
                            badgeContent={taill ? taill : size}
                            className="icon-bag"
                            color="secondary">
                            <Link
                                className="link-bag"
                                to="/shopping-cart">
                                <LocalMallOutlined />
                            </Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div
                className="infos-covid">
                <div
                    className="covid">
                    <div
                        className="icon">
                        <ArrowBackIosOutlined />
                    </div>
                    <div
                        className="covid-content">
                        Covid: Informations concernant les magasins et livraisons<br />
                        <a href="#">
                            En savoir plus
                        </a>
                    </div>
                    <div
                        className="icon">
                        <ArrowForwardIosOutlined />
                    </div>
                </div>
            </div>
            <Auth
                setOpen={setOpen}
                open={open}
                setIsLogged={setIsLogged} />
        </div>
    )
}

export default AppSideBar;