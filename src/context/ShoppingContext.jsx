import { createContext, useCallback, useReducer } from "react";
import { initialState, shoppingReducer } from "../reducers/shoppingReducer";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../actions/shoppingActions";
const ShoppingContext = createContext();

const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const { products, cart, loading, error } = state;
  const navigate = useNavigate();

  const url = "https://my-json-server.typicode.com/kikdras/products/data";

  const setProducts = () => {
    dispatch({ type: TYPES.LOADING });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const action = {
          type: TYPES.GET_ALL_PRODUCTS,
          payload: data,
        };

        dispatch(action);
      })
      .catch(() => dispatch({ type: TYPES.NO_PRODUCTS }));
  };

  const addToCart = (id) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const delFromCart = (id, all = false) => {
    if (all) dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    else dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const seeProduct = (id) => {
    navigate(`shop/${id}`);
  };

  const data = {
    products,
    cart,
    loading,
    error,
    seeProduct,
    setProducts,
    addToCart,
    delFromCart,
    clearCart,
  };

  return (
    <ShoppingContext.Provider value={data}>{children}</ShoppingContext.Provider>
  );
};

export { ShoppingProvider };
export default ShoppingContext;
