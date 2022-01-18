import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
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
import {
    ExpandLess,
    ExpandMore,
    FavoriteBorderOutlined,
    Star,
    StarBorder
} from '@material-ui/icons';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { storeCart } from '../../actions';
import Products from './Products';

const ProductDetails = ({ fetchProducts }) => {
    const [openLiv, setOpenLiv] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAvis, setOpenAvis] = useState(false);
    const userInfos = useSelector(state => state.user);
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [size, setSize] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const timer = useRef();
    const array = [0, 1, 2, 3, 4];

    const myHeader = {
        'Content-Type': 'application/json',
        'x-access-token': userInfos.token
    }

    const handleClick = () => {
        setOpenLiv(!openLiv);
    };

    const handleClose = () => {
        setSuccess(false);
        setOpenDialog(false);
    }

    const chooseSize = (e) => {
        setSize(43);
        if (e.target.className == "active") {
            e.target.className = "size-c";
        } else {
            e.target.className = "active";
        }
    }

    console.log("Taille: ", size);

    const addToCart = async () => {
        setIsClicked(true);
        if (size == undefined) {
            setError(true);
            setIsClicked(false);
        } else {
            setError(false);
            try {
                const results = await fetch("http://localhost:4000/api/cart", {
                    method: "POST",
                    headers: myHeader,
                    credentials: 'include',
                    body: JSON.stringify({
                        id_produit: productId,
                        qte_produit: 1
                    })
                });
                const data = await results.json();
                timer.current = window.setTimeout(() => {
                    setIsClicked(false);
                    setSuccess(true);
                    fetchProducts();
                }, 500)
            } catch (err) {
                console.log(err);
            }
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
                            <h4>Taille: </h4>
                            {error && <p style={{ "color": "red", "marginTop": "5px" }}>
                                Vous devez choisir une taille pour continuer.
                            </p>}
                            <div className="choose-size">
                                <div className="size-c" onClick={chooseSize}>45</div>
                                <div className="size-c" onClick={chooseSize}>44</div>
                                <div className="size-c" onClick={chooseSize}>43.5</div>
                                <div className="size-c" onClick={chooseSize}>43</div>
                                <div className="size-c" onClick={chooseSize}>42</div>
                                <div className="size-c" onClick={chooseSize}>41</div>
                                <div className="size-c" onClick={chooseSize}>40.5</div>
                                <div className="size-c" onClick={chooseSize}>40</div>
                                <div className="size-c" onClick={chooseSize}>39</div>
                                <div className="size-c" onClick={chooseSize}>38.5</div>
                                <div className="size-c" onClick={chooseSize}>37</div>
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