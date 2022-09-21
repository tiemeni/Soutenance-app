import React, { useState } from "react";
import { Timer, ArrowBackIosOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import RecapCart from "./CartItem/RecapCart";
import { useSelector } from "react-redux";
import StripeContainer from "../Payment/StripeContainer";

const ShoppingCart = ({
  total,
  success,
  setSuccess,
  fetchProducts,
  cartId,
}) => {
  const [open, setOpen] = useState(false);
  const panel = useSelector((state) => state.userPanel);

  return (
    <div className="container">
      <div className="container-details-products">
        <br />
        <div className="back-to-home">
          <Link className="link" to="/">
            <div style={{ display: "flex" }}>
              <ArrowBackIosOutlined style={{ marginRight: "20px" }} />
              <p>Retour</p>
            </div>
          </Link>
        </div>
        <br />
        <br />
        <div className="infos-livraison">
          <h3 id="titre">Livraison gratuite pour les membres.</h3>
          <p>
            Devenez Membre SNKRS pour profiter de livraisons rapides et
            gratuites.
          </p>
        </div>
        <h2 style={{ marginBottom: "20px" }}>Panier</h2>
        {panel.length <= 0 && (
          <div className="empty-cart">
            <h4>Vous n'avez encore aucun produit dans votre panier...</h4>
          </div>
        )}
        {panel.length > 0 &&
          panel.map((detail, id) => <CartItem detail={detail} key={id} />)}
        <br />
        <div className="time-out">
          <Timer style={{ marginRight: "20px" }} />
          <p>Plus que quelques exemplaires disponibles. Commandez vite.</p>
        </div>
        <br/>
        <br/>
      </div>
      <RecapCart subTotal={total} setOpen={setOpen} />
      <StripeContainer
        subTotal={total}
        setOpen={setOpen}
        open={open}
        success={success}
        setSuccess={setSuccess}
        cartId={cartId}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default ShoppingCart;
