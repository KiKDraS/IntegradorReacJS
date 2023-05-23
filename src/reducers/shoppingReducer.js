import { TYPES } from "../actions/shoppingActions";

export const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: false,
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPES.GET_ALL_PRODUCTS: {
      const data = action.payload;

      return {
        ...state,
        products: data,
        loading: false,
        error: false,
      };
    }

    case TYPES.ADD_TO_CART: {
      const id = action.payload;

      const productToAdd = state.products.find((product) => product.id === id);

      const productInCart = state.cart.find(
        (product) => product.id === productToAdd.id
      );

      return productInCart
        ? {
            ...state,
            cart: state.cart.map((product) =>
              product.id === productToAdd.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          }
        : { ...state, cart: [...state.cart, { ...productToAdd, quantity: 1 }] };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      const id = action.payload;

      const productToDelete = state.cart.find((product) => product.id === id);

      return productToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((product) =>
              product.id === productToDelete.id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }
        : {
            ...state,
            cart: state.cart.filter(
              (product) => product.id !== productToDelete.id
            ),
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      const id = action.payload;

      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== id),
      };
    }

    case TYPES.CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    case TYPES.NO_PRODUCTS: {
      return {
        ...state,
        error: "No se pudieron obtener los productos",
        loading: false,
      };
    }

    default:
      return state;
  }
}
