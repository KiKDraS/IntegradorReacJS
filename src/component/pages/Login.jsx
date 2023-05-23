import { useContext, useEffect } from "react";
import ErrorMsg from "../ErrorMsg";
import Loader from "../Loader";
import LoginForm from "../LoginForm";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { error, loading, setError } = useContext(AuthContext);

  useEffect(() => {
    const showMsg = () => {
      setTimeout(() => {
        setError({ err: false });
      }, 2000);
    };

    showMsg();

    return () => {
      clearTimeout(showMsg);
    };
  }, [error.err]);

  return (
    <div id="login">
      <h2>Iniciar Sesión</h2>
      <LoginForm />
      {loading && <Loader />}
      {error.err && <ErrorMsg msg="Usuario y/o contraseña incorrecta" />}
    </div>
  );
};

export default Login;
