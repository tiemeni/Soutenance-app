import React, { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, FavoriteBorderOutlined, Star, StarBorder } from '@material-ui/icons';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { storeCart } from '../../actions';

const ProductDetails = ({ fetchProducts }) => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAvis, setOpenAvis] = useState(false);
    const userInfos = useSelector(state => state.user);
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const dispatch = useDispatch();
    const timer = useRef();
    const array = [0, 1, 2, 3, 4];

    const myHeader = {
        'Content-Type': 'application/json',
        'x-access-token': userInfos.token
    }

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpenDialog(false);
    }

    const addToCart = async () => {
        setIsClicked(true);
        if (userInfos.length !== 0) {
            try {
                const results = await fetch("http://localhost:4000/api/cart", {
                    method: "POST",
                    headers: myHeader,
                    body: JSON.stringify({
                        id_produit: productId,
                        qte_produit: 1
                    })
                });
                const data = await results.json();
                timer.current = window.setTimeout(() => {
                    setIsClicked(false);
                    fetchProducts();
                }, 500)
            } catch (err) {
                console.log(err);
            }
        } else {
            timer.current = window.setTimeout(() => {
                setIsClicked(false);
                setOpenDialog(true);
                console.log("Vous devez être connecté pour disposer d'un panier");
            }, 600)
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
            } catch (error) {
                console.log(error);
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
                    <div className="image-produit">
                        <div className="image-item" style={{ marginRight: "15px" }}>
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1632439a-15ca-4213-842e-4e8b062a6c86/chaussure-air-max-97-pour-CV3dl7.png" alt="nike" />
                        </div>
                        <div className="image-item">
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/0063cf9f-a84b-4630-8a18-3750802f2a75/chaussure-air-max-97-pour-CV3dl7.png" alt="nike air" />
                        </div>
                        <div className="image-item" style={{ marginRight: "15px" }}>
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5470c589-41f0-4adb-82b2-e818275e2ed7/chaussure-air-max-97-pour-CV3dl7.png" alt="nike" />
                        </div>
                        <div className="image-item">
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e603ef60-5103-4e60-9751-cfc970d977bd/chaussure-air-max-97-pour-CV3dl7.png" alt="nike air" />
                        </div>
                        <div className="image-item" style={{ marginRight: "15px" }}>
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/263cd3cf-53d1-41b6-8c21-4fc81aa5c227/chaussure-air-max-97-pour-CV3dl7.png" alt="nike" />
                        </div>
                        <div className="image-item">
                            <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d67a06c6-3ae3-4144-9e59-0e02941f6e58/chaussure-air-max-97-pour-CV3dl7.png" alt="nike air" />
                        </div>
                    </div>
                    <div className="infos-produit">
                        <p id="category">{product.description}</p>
                        <h1 id="product_name">{product.nom_produit}</h1>
                        <p style={{ marginBottom: "50px" }}>{product.prix_unitaire} XAF</p>
                        <div className="button-div">
                            <Button id="payment" className="panier" variant="contained" onClick={addToCart} >{isClicked ? <CircularProgress size={20} /> : "Ajouter au panier"}</Button>
                            <Button id="add-favorite" variant="contained" endIcon={<FavoriteBorderOutlined />} >Ajouter au favoris</Button>
                            <p id="details-description">Inspirée des trains à grande vitesse japonais, la Nike Air Max 97 affiche un style fulgurant qui en met plein la vue.Elle reprend l'unité Nike Air révolutionnaire sur toute la longueur qui a bousculé le monde du running, et ajoute un coloris argenté pour vous permettre d'évoluer dans le plus grand confort.</p>
                            <Divider />
                            <List>
                                <ListItem id="list-item-button" onClick={handleClick}>
                                    <ListItemText primary={<h3 id="list-item-text">Livraisons et retours gratuits</h3>} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse id="livraison-gratuite" in={open} timeout="auto" unmountOnExit>
                                    <p>Livraison standard gratuite avec l'Adhésion Nike.</p>
                                    <ul>
                                        <li>La livraison sera plus longue que d'habitude. Vérifiez la date de livraison estimée lors du paiement.</li>
                                        <li>Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60 jours.</li>
                                    </ul>
                                </Collapse>
                                <Divider />
                                <ListItem id="list-item-button" onClick={() => { setOpenAvis(!openAvis) }}>
                                    <ListItemText primary={<h3 id="list-item-text">Avis (0)</h3>} />
                                    {array.map(data => <Star style={{ color: "#b8b8b8" }} />)}
                                    {openAvis ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse id="livraison-gratuite" in={openAvis} timeout="auto" unmountOnExit>
                                    <div id="star">
                                        <p>{array.map(data => <Star style={{ color: "#b8b8b8" }} />)}</p>
                                        <p>0 Étoiles </p>
                                    </div>
                                    <p>Exprimez-vous. Soyez le premier à commenter {product.nom_produit}.</p>
                                    <p><a href="#">Rédiger un avis</a></p>
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
                    <DialogTitle>{"IMPORTANT"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Vous devez disposer d'un compte membre afin de continuer sur notre site.
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