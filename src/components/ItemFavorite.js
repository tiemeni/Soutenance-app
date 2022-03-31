import { useState } from "react";
import { useDispatch } from "react-redux";
import { enleverFavorite, offToast, setToast } from "../actions";

const ItemFavorite = (props) => {
  const dispatch = useDispatch();
  //const [showNoFav, setShowNoFav] = useState(false)
  const handleDelete = () => {
    setTimeout(() => {
      dispatch(enleverFavorite(props.prodId));
    }, 500);
  };

  return (
    <div
      style={{
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid #f6f6f6",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          height: "150px",
          width: "200px",
        }}
      >
        <img
          src={props.image}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          width: "500px",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "30px",
            marginBottom: "5px",
          }}
        >
          <strong>{props.nomProduit}</strong>
        </div>
        <div
          style={{
            width: "200px",
            height: "30px",
            marginBottom: "5px",
          }}
        >
          {props.descriptionProduit}
        </div>
        <div
          style={{
            width: "100px",
            height: "30px",
            marginBottom: "5px",
          }}
        >
          {props.couleurProduit}
        </div>
        <div
          style={{
            width: "175px",
            height: "30px",
            marginBottom: "5px",
          }}
        >
          {props.tailleProduit}
        </div>
        <div
          style={{
            width: "175px",
            height: "30px",
            marginBottom: "5px",
          }}
        >
          <strong
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleDelete}
          >
            Supprimer des favoris
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ItemFavorite;
