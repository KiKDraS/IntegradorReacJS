import Loader from "../Loader";
import ErrorMsg from "../ErrorMsg";
import ShoppingCart from "../ShoppingCart";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import ShoppingContext from "../../context/ShoppingContext";

const Inicio = () => {
  const { auth, checkPreviousLog } = useContext(AuthContext);
  const { error, loading } = useContext(ShoppingContext);

  useEffect(() => {
    checkPreviousLog();
  }, []);

  return (
    <>
      <h1>Tienda Virtual</h1>
      {auth ? <h2>Hola {auth}</h2> : <h2>Bienvenido</h2>}
      {loading && <Loader />}
      {error && <ErrorMsg msg={error} />}
      <ShoppingCart />
    </>
  );
};

export default Inicio;
