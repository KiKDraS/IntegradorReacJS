import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingContext from "../context/ShoppingContext";
import AuthContext from "../context/AuthContext";

const ProductItem = ({ data, idView, addItem }) => {
  const { id, name, price, img, description } = data;
  const { seeProduct, addToCart } = useContext(ShoppingContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const addProduct = (id) => {
    if (!auth) {
      const confirm = window.confirm(
        "Es necesario iniciar sesión. Presione aceptar para hacerlo"
      );

      if (confirm) navigate("/login");
    } else if (auth & idView) {
      addItem(id);
    } else {
      addToCart(id);
    }
  };

  const handleClick = () => {
    if (idView) navigate("/");
    else seeProduct(id);
  };

  return (
    <div style={{ border: "thin solid gray", padding: "1rem" }}>
      <h4>{name}</h4>
      <img width={150} src={img} alt={name} />
      <h5>${price}</h5>
      <p>{description}</p>
      <button className="btn btn-success me-2" onClick={() => addProduct(id)}>
        Agregar
      </button>
      <button className="btn btn-secondary" onClick={handleClick}>
        {idView ? "volver" : "+"}
      </button>
    </div>
  );
};

export default ProductItem;
