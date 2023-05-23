import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import ShoppingContext from "../../context/ShoppingContext";
import { useNavigate, useParams } from "react-router-dom";

const ItemPage = () => {
  const [product, setProduct] = useState(null);
  const { addToCart, products } = useContext(ShoppingContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const item = products.find((el) => el.id === id);
    setProduct(item);
  }, []);

  const addItem = (id) => {
    addToCart(id);
    const back = window.confirm(
      `Producto agregado. Presione aceptar para volver`
    );

    if (back) navigate("/");
  };

  return (
    <article className="box grid-responsive">
      {product && <ProductItem data={product} idView={id} addItem={addItem} />}
    </article>
  );
};

export default ItemPage;
