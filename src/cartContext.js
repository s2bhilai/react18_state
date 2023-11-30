import { createContext, useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

const CartContext = createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into json.");
  initialCart = [];
}

export default function CartProvider(props) {
  //In useState, If we declare the default state as function , then it's evaluated once
  //otherwise if we specify anything without function, it will evaluate for every render.
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const contextValue = { cart, dispatch };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used with in CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
