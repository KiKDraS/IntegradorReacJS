import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { auth, logOut } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-primary p-2">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          App
        </Link>
        {auth ? (
          <Link
            className="nav-link text-white"
            aria-current="page"
            to="/"
            onClick={logOut}
          >
            LogOut
          </Link>
        ) : (
          <Link className="nav-link text-white" aria-current="page" to="/login">
            LogIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
