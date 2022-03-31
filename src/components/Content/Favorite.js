import { useState } from "react";
import { useSelector } from "react-redux";
import ItemFavorite from "../ItemFavorite";
import NoResultComp from "../NoResultComp";

const Favorite = () => {
  const favorites = useSelector((state) => state.Favorite);
  const products = useSelector((state) => state.product);
  for (var i = 0; i < favorites.length; i++) {
    for (var j = 0; j < products.length; j++) {
      if (favorites[i].productId === products[j]._id) {
        favorites[i].nom = products[j].nom_produit;
        favorites[i].description = products[j].description;
        favorites[i].couleur = products[j].couleur_dispo;
        favorites[i].image = products[j].image_url;
      }
    }
  }
  return (
    <div style={{ height: "500px" }}>
      {favorites.length > 0 ? (
        <div style={{ marginLeft: "25%", paddingTop: "15px" }}>
          <strong style={{ fontSize: 30, color: "rgb(87, 84, 84)" }}>
            Favoris
          </strong>
        </div>
      ) : (
        ""
      )}
      {favorites.length > 0 ? (
        favorites.map((prod, id) => (
          <ItemFavorite
            key={id}
            prodId={prod.productId}
            image={prod.image}
            nomProduit={prod.nom}
            descriptionProduit={prod.description}
            couleurProduit={prod.couleur}
            tailleProduit={prod.taille}
          />
        ))
      ) : (
        <NoResultComp title={"Favorite"} />
      )}
    </div>
  );
};

export default Favorite;
