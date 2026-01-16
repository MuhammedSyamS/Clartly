import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";

import HomePage from "./pages/Home";
import WishlistPage from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

/* ---------- Layout ---------- */
function Layout() {
  const { wishlist } = useWishlist();

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
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
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
