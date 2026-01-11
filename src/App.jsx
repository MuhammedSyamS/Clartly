import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";

import HomePage from "./pages/Home";
import WishlistPage from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/signup";

import { useCart } from "./context/CartContext";

/* ---------- Layout ---------- */
function Layout({ wishlist }) {
  return (
    <>
      <Navbar wishlistCount={wishlist.length} />
      <Outlet />
      <Footer />
    </>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <>
    <Routes>
  <Route element={<Layout wishlist={wishlist} />}>
    <Route
      index
      element={
        <HomePage
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      }
    />

    <Route
      path="wishlist"
      element={
        <WishlistPage
          wishlist={wishlist}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
        />
      }
    />

    <Route path="cart" element={<Cart />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="orders" element={<Orders />} />

    {/* AUTH */}
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
  </Route>
</Routes>


      {/* CHATBOT — GLOBAL */}
      <ChatBot />
    </>
  );
}
