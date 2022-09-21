import { useSelector } from "react-redux";
import ItemFavorite from "../ItemFavorite";
import NoResultComp from "../NoResultComp";

const Favorite = () => {
  const favorites = useSelector((state) => state.Favorite);
  const products = useSelector((state) => state.product);
  for (let fav of favorites) {
    for (let prod of products) {
      if (fav.productId === prod._id) {
        fav.nom = prod.nom_produit;
        fav.description = prod.description;
        fav.couleur = prod.couleur_dispo;
        fav.image = prod.image_url;
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
