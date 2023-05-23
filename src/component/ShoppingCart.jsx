import "./ShoppingCart.css";
import CartItem from "./CartItem";
import ProductItem from "./ProductItem";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ShoppingContext from "../context/ShoppingContext";

const ShoppingCart = () => {
  const { auth } = useContext(AuthContext);
  const { products, cart, clearCart, setProducts } =
    useContext(ShoppingContext);

  useEffect(() => {
    if (products.length < 1) setProducts();
  }, []);

  return (
    <>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))
        ) : (
          <p>Sin Productos</p>
        )}
      </article>
      {auth && (
        <>
          <h3>Carrito</h3>
          <article>
            <button className="btn btn-danger" onClick={clearCart}>
              Limpiar Carrito
            </button>
            {cart.map((item, index) => (
              <CartItem key={index} data={item} />
            ))}
          </article>
        </>
      )}
    </>
  );
};

export default ShoppingCart;
