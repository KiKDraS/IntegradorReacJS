import React from "react";
import ReactDOM from "react-dom/client";

//Import de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
