import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ err: false });
  const navigate = useNavigate();

  const url = "https://my-json-server.typicode.com/kikdras/users/all";

  const logIn = (userName) => {
    localStorage.setItem("userName", JSON.stringify(userName));
    setAuth(userName);
    navigate("/");
  };

  const logOut = () => {
    setAuth(null);
    localStorage.removeItem("userName");
  };

  const checkPreviousLog = () => {
    const user = JSON.parse(localStorage.getItem("userName"));
    setAuth(user);
  };

  const checkCredentials = (form) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (user) =>
            user.userName === form.userName && user.password === form.password
        );

        if (!user) {
          const err = new Error("User no encontrado");
          err.err = true;
          throw err;
        }

        logIn(user.userName);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const data = {
    auth,
    loading,
    error,
    checkCredentials,
    checkPreviousLog,
    logOut,
    setError,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
