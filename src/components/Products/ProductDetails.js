import React, { useEffect, useRef, useState } from 'react';
import {
    CircularProgress,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    Snackbar
} from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {
    ExpandLess,
    ExpandMore,
    FavoriteBorderOutlined,
    Star
} from '@material-ui/icons';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { ajouterPanier, increasePanel } from '../../actions';

const ProductDetails = () => {
    const [openLiv, setOpenLiv] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAvis, setOpenAvis] = useState(false);
    const userInfos = useSelector(state => state.user);
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const timer = useRef();
    const array = [0, 1, 2, 3, 4];
    const [taille, setTaille] = useState(40);
    const [qte, setQte] = useState(1)
    const [open, setOpen] = React.useState(false);
    const [openQte, setOpenQte] = React.useState(false);
    const handleChange = (event) => {
        setTaille(event.target.value);
    };
    const handleChangeQte = e => {
        setQte(e.target.value)
    }
    const handleCloseSize = () => {
        setOpen(false);
    };
    const handleCloseSizeQte = () => {
        setOpenQte(false);
    };
    const handleOpenQte = () => {
        setOpenQte(true);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClick = () => {
        setOpenLiv(!openLiv);
    };
    const handleClose = () => {
        setSuccess(false);
    }
    const addToCart = async () => {
        window.setTimeout(() => {
            setSuccess(true);
        }, 1000)
        if (taille === undefined) {
            setError(true);
            setIsClicked(false);
        } else {
            setError(false);

            const userProd = {
                productId,
                qte,
                taille
            }
            dispatch(ajouterPanier(userProd))
            dispatch(increasePanel())
        }
    }

    useEffect(() => {
        const getProductById = async () => {
            try {
                const results = await fetch('http://localhost:4000/api/products/' + productId);
                const data = await results.json();

                setProduct(data);
                timer.current = window.setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            } catch (err) {
                console.log(err);
            }
        }

        getProductById();
    }, [])





    return (
        <div className="content-body">
            {isLoading ?
                <div className="loading-product">
                    <CircularProgress id="circular-progress" />
                    <h4>Chargements...</h4>
                </div>
                :
                <div className="details-produit">
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={success}
                        autoHideDuration={8000}
                        onClose={handleClose}>
                        <Alert
                            onClose={handleClose} severity="success">
                            <AlertTitle>
                                Succès
                            </AlertTitle>
                            La <strong>{product.nom_produit}</strong>
                            a été ajouté à votre panier.
                        </Alert>
                    </Snackbar>
                    <div className="image-produit">
                        <div className="image-item"
                            style={{ marginRight: "15px" }}>
                            <img
                                src={product.description_img1}
                                alt="nike" />
                        </div>
                        <div
                            className="image-item">
                            <img
                                src={product.description_img2} />
                        </div>
                        <div
                            className="image-item"
                            style={{ marginRight: "15px" }}>
                            <img
                                src={product.description_img3} />
                        </div>
                        <div
                            className="image-item">
                            <img src={product.description_img4} />
                        </div>
                        <div className="image-item"
                            style={{ marginRight: "15px" }}>
                            <img src={product.description_img5} />
                        </div>
                        <div className="image-item">
                            <img src={product.description_img6} />
                        </div>
                    </div>
                    <div className="infos-produit">
                        <p id="category"
                            className="category">{product.description}</p>
                        <h1 id="product_name"
                            className="product_name">
                            {product.nom_produit}
                        </h1>
                        <p id="prix-s"
                            style={{ marginBottom: "50px" }}>
                            {product.prix_unitaire} Fcfa
                        </p>
                        <div className="button-div">
                            <h4>Choisir une taille: </h4>
                            {error && <p style={{ "color": "red", "marginTop": "5px" }}>
                                Vous devez choisir une taille pour continuer.
                            </p>}
                            <div>
                                <FormControl sx={{ m: 1, minWidth: 120, width: "400px", marginBottom: "30px" }}>
                                    <InputLabel id="demo-controlled-open-select-label">Taille</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleCloseSize}
                                        onOpen={handleOpen}
                                        value={taille}
                                        label="Taille"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={45}>45</MenuItem>
                                        <MenuItem value={44}>44</MenuItem>
                                        <MenuItem value={43.5}>43.5</MenuItem>
                                        <MenuItem value={43}>43</MenuItem>
                                        <MenuItem value={42}>42</MenuItem>
                                        <MenuItem value={41}>41</MenuItem>
                                        <MenuItem value={40.5}>40.5</MenuItem>
                                        <MenuItem value={40}>40</MenuItem>
                                        <MenuItem value={39}>39</MenuItem>
                                        <MenuItem value={38.5}>38.5</MenuItem>
                                        <MenuItem value={37}>37</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 120, width: "400px", marginBottom: "40px" }}>
                                    <InputLabel id="demo-controlled-open-select-label">Quantité</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={openQte}
                                        onClose={handleCloseSizeQte}
                                        onOpen={handleOpenQte}
                                        value={qte}
                                        label="Quantité"
                                        onChange={handleChangeQte}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={11}>11</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Button id="payment"
                                className="panier"
                                variant="contained"
                                onClick={addToCart} >
                                {isClicked ?
                                    <CircularProgress style={{ color: "white" }} size={20} /> : "Ajouter au panier"}
                            </Button>
                            <Button id="add-favorite"
                                variant="contained"
                                onClick={() => { setOpenDialog(true) }}
                                endIcon={<FavoriteBorderOutlined />} >
                                Ajouter au favoris
                            </Button>
                            <p id="details-description">
                                Inspirée des trains à grande vitesse japonais, la {product.nom_produit} affiche un style fulgurant qui en met plein la vue.Elle reprend l'unité Nike Air révolutionnaire sur toute la longueur qui a bousculé le monde du running, et ajoute un coloris argenté pour vous permettre d'évoluer dans le plus grand confort.</p>
                            <Divider />
                            <List>
                                <ListItem id="list-item-button"
                                    onClick={handleClick}>
                                    <ListItemText
                                        primary={<h3 id="list-item-text">Livraisons et retours gratuits</h3>} />
                                    {openLiv ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse id="livraison-gratuite"
                                    in={openLiv}
                                    timeout="auto"
                                    unmountOnExit>
                                    <p>Livraison standard gratuite avec l'Adhésion Nike.</p>
                                    <ul>
                                        <li>La livraison sera plus longue que d'habitude. Vérifiez la date de livraison estimée lors du paiement.</li>
                                        <li>Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60 jours.</li>
                                    </ul>
                                </Collapse>
                                <Divider />
                                <ListItem id="list-item-button"
                                    onClick={() => { setOpenAvis(!openAvis) }}>
                                    <ListItemText
                                        primary={<h3 id="list-item-text">Avis (0)</h3>} />
                                    {array.map((data, id) => <Star key={id} style={{ color: "#b8b8b8" }} />)}
                                    {openAvis ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse id="livraison-gratuite"
                                    in={openAvis} timeout="auto" unmountOnExit>
                                    <div id="star">
                                        <p>{array.map((data, id) => <Star key={id} style={{ color: "#b8b8b8" }} />)}</p>
                                        <p>0 Étoiles </p>
                                    </div>
                                    <p>
                                        Exprimez-vous. Soyez le premier à commenter {product.nom_produit}.
                                    </p>
                                    <p>
                                        <a href="#">Rédiger un avis</a>
                                    </p>
                                </Collapse>
                                <Divider />
                            </List>
                        </div>
                    </div>
                </div>
            }
            <div>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>
                        {"IMPORTANT"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description">
                            Vous devez disposer d'un <strong>Compte Membre</strong> afin de disposer d'un espace de <strong>favoris</strong>.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ProductDetails;