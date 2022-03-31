import React, { useEffect, useRef, useState } from "react";
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
  Snackbar,
} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import {
  ExpandLess,
  ExpandMore,
  FavoriteBorderOutlined,
  Star,
} from "@material-ui/icons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  ajouterFavorite,
  ajouterPanier,
  increasePanel,
  offToast,
  processAmount,
  setToast,
} from "../../actions";

const ProductDetails = () => {
  const products = useSelector((state) => state.product);
  const [openLiv, setOpenLiv] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAvis, setOpenAvis] = useState(false);
  const userInfos = useSelector((state) => state.user);
  const { productId } = useParams();
  const sProduct = products
    ? Array.from(products).filter((element) => element._id === productId)[0]
    : null;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const timer = useRef();
  const array = [0, 1, 2, 3, 4];
  const [taille, setTaille] = useState(40);
  const [qte, setQte] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [openQte, setOpenQte] = React.useState(false);
  const handleChange = (event) => {
    setTaille(event.target.value);
  };
  const handleChangeQte = (e) => {
    setQte(e.target.value);
  };
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
  };
  const addToCart = async () => {
    window.setTimeout(() => {
      setSuccess(true);
    }, 1000);
    if (taille === undefined) {
      setError(true);
      setIsClicked(false);
    } else {
      setError(false);

      const userProd = {
        productId,
        qte,
        taille,
      };
      const specProd = products.filter((prod) => prod._id === productId)[0];
      dispatch(processAmount(specProd.prix_unitaire * qte));
      dispatch(ajouterPanier(userProd));
      dispatch(increasePanel());
    }
  };

  useEffect(() => {
    if (sProduct) {
      setIsLoading(false);
    } else {
      const getProductById = async () => {
        try {
          const results = await fetch(
            "http://localhost:4000/api/products/" + productId
          );
          const data = await results.json();
          setProduct(data);
          timer.current = window.setTimeout(() => {
            setIsLoading(false);
          }, 200);
        } catch (err) {
          console.log(err);
        }
        getProductById();
      };
    }
  }, [products]);

  const handleFavorite = () => {
    const favProd = {
      productId,
      taille,
    };
    dispatch(ajouterFavorite(favProd));
    dispatch(setToast("success", " Succès de l'ajout au favoris ..."));
    setTimeout(() => {
      dispatch(offToast());
    }, 3000);
  };

  const tabTaille = [45, 44, 43.5, 43, 42, 41, 40.5, 40, 39, 38.5, 37];

  return (
    <div className="content-body">
      {isLoading ? (
        <div className="loading-product">
          <CircularProgress id="circular-progress" />
          <h4>Chargements...</h4>
        </div>
      ) : (
        <div className="details-produit">
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={success}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              <AlertTitle>Succès</AlertTitle>
              La <strong>{sProduct.nom_produit}</strong>a été ajouté à votre
              panier.
            </Alert>
          </Snackbar>
          <div className="image-produit">
            <div className="image-item" style={{ marginRight: "15px" }}>
              <img src={sProduct.description_img1} alt="nike" />
            </div>
            <div className="image-item">
              <img src={sProduct.description_img2} />
            </div>
            <div className="image-item" style={{ marginRight: "15px" }}>
              <img src={sProduct.description_img3} />
            </div>
            {sProduct.description_img4 && (
              <div className="image-item">
                <img src={sProduct.description_img4} />
              </div>
            )}
            {sProduct.description_img4 && (
              <div className="image-item" style={{ marginRight: "15px" }}>
                <img src={sProduct.description_img5} />
              </div>
            )}
            {sProduct.description_img6 && (
              <div className="image-item">
                <img src={sProduct.description_img6} />
              </div>
            )}
          </div>
          <div className="infos-produit">
            <p id="category" className="category">
              {sProduct.description}
            </p>
            <h1 id="product_name" className="product_name">
              {sProduct.nom_produit}
            </h1>
            <p id="prix-s" style={{ marginBottom: "50px" }}>
              {sProduct.prix_unitaire} Fcfa
            </p>
            <div className="button-div">
              <h4>Choisir une taille: </h4>
              {error && (
                <p
                  style={{
                    color: "red",
                    marginTop: "5px",
                  }}
                >
                  Vous devez choisir une taille pour continuer.
                </p>
              )}
              <div>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    width: "400px",
                    marginBottom: "30px",
                  }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Taille
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    style={{ width: "100%" }}
                    open={open}
                    onClose={handleCloseSize}
                    onOpen={handleOpen}
                    value={taille}
                    label="Taille"
                    onChange={handleChange}
                  >
                    {tabTaille.map((el, i) => (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    width: "400px",
                    marginBottom: "40px",
                  }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Quantité
                  </InputLabel>
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
                    {tabTaille.map((el, i) => (
                      <MenuItem key={i} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
                id="payment"
                className="panier"
                variant="contained"
                onClick={addToCart}
              >
                {isClicked ? (
                  <CircularProgress style={{ color: "white" }} size={20} />
                ) : (
                  "Ajouter au panier"
                )}
              </Button>
              <Button
                id="add-favorite"
                variant="contained"
                onClick={handleFavorite}
                endIcon={<FavoriteBorderOutlined />}
              >
                Ajouter au favoris
              </Button>
              <p id="details-description">
                Inspirée des trains à grande vitesse japonais, la{" "}
                {sProduct.nom_produit} affiche un style fulgurant qui en met
                plein la vue.Elle reprend l'unité Nike Air révolutionnaire sur
                toute la longueur qui a bousculé le monde du running, et ajoute
                un coloris argenté pour vous permettre d'évoluer dans le plus
                grand confort.
              </p>
              <Divider />
              <List>
                <ListItem id="list-item-button" onClick={handleClick}>
                  <ListItemText
                    primary={
                      <h3 id="list-item-text">
                        Livraisons et retours gratuits
                      </h3>
                    }
                  />
                  {openLiv ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  id="livraison-gratuite"
                  in={openLiv}
                  timeout="auto"
                  unmountOnExit
                >
                  <p>Livraison standard gratuite avec l'Adhésion Nike.</p>
                  <ul>
                    <li>
                      La livraison sera plus longue que d'habitude. Vérifiez la
                      date de livraison estimée lors du paiement.
                    </li>
                    <li>
                      Vous pouvez retourner votre commande gratuitement, quelle
                      que soit la raison, dans un délai de 60 jours.
                    </li>
                  </ul>
                </Collapse>
                <Divider />
                <ListItem
                  id="list-item-button"
                  onClick={() => {
                    setOpenAvis(!openAvis);
                  }}
                >
                  <ListItemText
                    primary={<h3 id="list-item-text">Avis (0)</h3>}
                  />
                  {array.map((data, id) => (
                    <Star key={id} style={{ color: "#b8b8b8" }} />
                  ))}
                  {openAvis ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  id="livraison-gratuite"
                  in={openAvis}
                  timeout="auto"
                  unmountOnExit
                >
                  <div id="star">
                    <p>
                      {array.map((data, id) => (
                        <Star key={id} style={{ color: "#b8b8b8" }} />
                      ))}
                    </p>
                    <p>0 Étoiles </p>
                  </div>
                  <p>
                    Exprimez-vous. Soyez le premier à commenter{" "}
                    {sProduct.nom_produit}.
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
      )}
      <div>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"IMPORTANT"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Vous devez disposer d'un <strong>Compte Membre</strong> afin de
              disposer d'un espace de <strong>favoris</strong>.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductDetails;
