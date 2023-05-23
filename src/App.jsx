import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/pages/Layout";
import Inicio from "./component/pages/Inicio";
import Login from "./component/pages/Login";
import ItemPage from "./component/pages/ItemPage";
import { AuthProvider } from "./context/AuthContext";
import { ShoppingProvider } from "./context/ShoppingContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Inicio />} />
              <Route path="login" element={<Login />} />
              <Route path="shop/:id" element={<ItemPage />} />
            </Route>
          </Routes>
        </ShoppingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
