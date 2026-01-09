import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import WishlistPage from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import { useCart } from "./context/CartContext";

function Layout({ wishlist }) {
  return (
    <>
      <Navbar wishlistCount={wishlist.length} />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart(); // from context

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
    <Routes>
      {/* ✅ Layout wrapper */}
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
      </Route>
    </Routes>
  );
}
