import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import ProductsComponent from "./ProductsComponent";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

//written outside the component since it needs to run only once.
let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into json.");
  initialCart = [];
}

//Changes 1
export default function App() {
  //In useState, If we declare the default state as function , then it's evaluated once
  //otherwise if we specify anything without function, it will evaluate for every render.
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  //Changes 2
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<ProductsComponent />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
