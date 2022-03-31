import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link to={"/product/" + product._id} style={{ textDecoration: "none" }}>
      <div className="product-card">
        <div className="product-img">
          <img className="skeleton" src={product.image_url} />
        </div>
        <div className="product-details">
          <p id="category">{product.category}</p>
          <p id="product_name">{product.nom_produit}</p>
          <p id="category1">{product.description}</p>
          <p id="couleur">{product.couleur_dispo}</p>
          <p id="prix">{product.prix_unitaire} Fcfa</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
